(function ($) { 
	$.fn.extend({ 
		jqCart: function(cartname) { 
			var cartval = $.cookie(cartname); 
		    var items = new Array();

			if (cartval != null)
				items = cartval.split('|');; 

			return { 
				add: function(id, num) { 
					var inx = this.found(id);

					if (inx != -1) {
						line = items[inx].split(':');
						if (line.length != 2) 
							val = parseInt(num);
						else
							val = parseInt(num)+parseInt(line[1]);
						items[inx] = id+':'+val;
					}
					else {
						items.push(id+':'+num); 
					}

					this.save(); 
				}, 
				modify: function(id, num) {
					var inx = this.found(id);
					
					if (inx != -1) {
						items[inx] = id+':'+num;
						this.save(); 
					}
				},				
				remove: function(id) {
					var inx = this.found(id);
					
					if (inx != -1) {
						items.splice(inx, 1);
						
						this.save(); 
					}
				}, 
				found: function(id) { 
					var line = null;
					for (var i = 0; i < items.length; i++) {
						line = items[i].split(':');
						if (line.length != 2)
							continue;

						if (line[0] == id) {
							return i;
						} 
					}

					return -1;
				}, 
				clear: function () { 
					items = null; 
					this.save(); 
				},				
				save: function() {
					$.cookie(cartname, items.join('|'), {expires: 15}); 
				},				
				count: function() {
					var total = 0;
					var line = null;
					for (var i = 0; i < items.length; i++) {
						line = items[i].split(':');
						if (line.length != 2)
							continue;
							
						total += parseInt(line[1]);
					}

					return total; 
				}
			}; 
		} 
	}); 
})(jQuery); 

