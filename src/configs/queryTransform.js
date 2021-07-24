module.exports = function (query) {
	if (query.$filter) {
		query.$filter = new Node(query.$filter.type, query.$filter.left, query.$filter.right, query.$filter.func, query.$filter.args).transform()
	} else {
		query.$filter = {}
	}

	if (query.$top) {
		query.$limit = query.$top
	}

	if (query.$orderby) {
		query.$sort = {}
		query.$orderby.forEach(function (prop) {
			var propName = Object.keys(prop)[0]
			query.$sort[propName] = prop[propName] === 'desc' ? -1 : 1
		})
	}

	if (query.$inlinecount === 'allpages') {
		query.$count = true
	}

	var select = {}
	for (var key in query.$select || []) {
		select[query.$select[key]] = 1
	}
	query.$select = select

	return query
}

function Node(type, left, right, func, args) {
	this.type = type
	this.left = left
	this.right = right
	this.func = func
	this.args = args
}


Node.prototype.transform = function () {
	var result = {}

	// 
	if (this.left && (this.left.type == 'property') && this.left.name) {
		this.left.name = this.left.name.replace('/', '.');
	}

	//
	if (this.right && this.right.value) {
		if (Array.isArray(this.right.value)) {
			this.right.value = this.right.value.shift();
		}
		if (this.right.type == 'literal') {
			if (this.right.value.startsWith && this.right.value.startsWith('$date:')) {
				var dvalue = this.right.value.replace('$date:', '');
				this.right.value = new Date(new Date(dvalue));
			}
			else if (this.right.value === 'null') {
				this.right.value = null;
			}
		}
	}

	//
	if (this.type === 'eq' && this.right.type === 'literal') {
		result[this.left.name] = this.right.value
	}

	if (this.type === 'ne' && this.right.type === 'literal') {
		result[this.left.name] = { '$ne': this.right.value }
	}

	if (this.type === 'lt' && this.right.type === 'literal') {
		result[this.left.name] = { '$lt': this.right.value }
	}
	if (this.type === 'le' && this.right.type === 'literal') {
		result[this.left.name] = { '$lte': this.right.value }
	}

	if (this.type === 'gt' && this.right.type === 'literal') {
		result[this.left.name] = { '$gt': this.right.value }
	}
	if (this.type === 'ge' && this.right.type === 'literal') {
		result[this.left.name] = { '$gte': this.right.value }
	}

	//
	if (this.type === 'and') {
		result['$and'] = result['$and'] || []
		if (this.left.type == 'functioncall') {
			result['$and'].push(new Node(this.left.type, this.left.left, this.left.right, this.left.func, this.left.args).transform())
		}
		else {
			result['$and'].push(new Node(this.left.type, this.left.left, this.left.right, this.func, this.args).transform())
		}
		//
		if (this.right.type == 'functioncall') {
			result['$and'].push(new Node(this.right.type, this.right.left, this.right.right, this.right.func, this.right.args).transform())
		}
		else {
			result['$and'].push(new Node(this.right.type, this.right.left, this.right.right, this.func, this.args).transform())
		}

	}

	if (this.type === 'or') {
		result['$or'] = result['$or'] || []
		if (this.left.type == 'functioncall') {
			result['$or'].push(new Node(this.left.type, this.left.left, this.left.right, this.left.func, this.left.args).transform())
		}
		else {
			result['$or'].push(new Node(this.left.type, this.left.left, this.left.right, this.func, this.args).transform())
		}
		//
		if (this.right.type == 'functioncall') {
			result['$or'].push(new Node(this.right.type, this.right.left, this.right.right, this.right.func, this.right.args).transform())
		}
		else {
			result['$or'].push(new Node(this.right.type, this.right.left, this.right.right, this.func, this.args).transform())
		}
	}

	if (this.type === 'functioncall') {
		switch (this.func) {
			case 'substringof': substringof(this, result)
		}
	}

	return result
}

function substringof(node, result) {
	var prop = node.args[0].type === 'property' ? node.args[0] : node.args[1];

	if ((prop.type === 'property') && prop.name) {
		prop.name = prop.name.replace('/', '.');
	}
	var lit = node.args[0].type === 'literal' ? node.args[0] : node.args[1];

	var search = decodeURIComponent(lit.value);
	search = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	result[prop.name] = new RegExp(search, "i")
}

