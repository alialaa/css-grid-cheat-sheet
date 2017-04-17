angular.module('cssGridCC', ['dndLists'])

.controller('CSSGridController', ['$scope', function($scope) {

    var vm = this;


    $scope.$watch(function() {
        vm.addExtraRows();
    });

    var colours = ['F44336','E91E63', '9C27B0', '673AB7', '3F51B5', '2196F3', '00BCD4', '009688', '4CAF50', '8BC34A', 'CDDC39', 'FFEB3B', 'FFC107', 'FF9800', 'FF5722', '795548', '607D8B'];

    vm.selected_item = -1;
    vm.guids = true;
    vm.expermental_guids = true;

    vm.natural_cols = 0;
    vm.natural_rows = 0;

    /*##### COLUMNS ####### */
    vm.grid_template_columns_arr = [{value: 1, unit: 'fr', repeat: 2}, {value: 100, unit: 'px', repeat: 2}];
    vm.grid_template_columns = '';
    vm.creatColumnsString = () => {
        vm.natural_cols = 0;
    	vm.grid_template_columns = vm.grid_template_columns_arr.map((column) => {
	    	let ro = (column.repeat > 1) ? `repeat(${column.repeat}, ` : ``;
	    	let rc = (column.repeat > 1) ? `)` : ``;
            vm.natural_cols += column.repeat;
	    	return `${ro}${column.value}${column.unit}${rc}`;
	    })
	    vm.grid_template_columns = vm.grid_template_columns.join(' ');
	    setTimeout(() => $('select').material_select(), 0);
    }
    vm.creatColumnsString();
    vm.addColumn = () => {
    	vm.grid_template_columns_arr.push({value: 1, unit: 'fr', repeat: 1});
    	vm.creatColumnsString();
    	setTimeout(() => $('select').material_select(), 0);
    }
    vm.removeColumn = (index) => {
    	vm.grid_template_columns_arr.splice(index, 1);
    	vm.creatColumnsString();
    	setTimeout(() => $('select').material_select(), 0);
    }
    /*################### */

    /*##### ROWS ####### */
    vm.grid_template_rows_arr = [{value: 1, unit: 'fr', repeat: 3}, {value: 100, unit: 'px', repeat: 2}];
    vm.grid_template_rows = '';
    vm.creatRowsString = () => {
        vm.natural_rows = 0;
    	vm.grid_template_rows = vm.grid_template_rows_arr.map((row) => {
	    	let ro = (row.repeat > 1) ? `repeat(${row.repeat}, ` : ``;
	    	let rc = (row.repeat > 1) ? `)` : ``;
            vm.natural_rows += row.repeat;
	    	return `${ro}${row.value}${row.unit}${rc}`;
	    })
	    vm.grid_template_rows = vm.grid_template_rows.join(' ');
	    setTimeout(() => $('select').material_select(), 0);
    }
    vm.creatRowsString();
    vm.addRow = () => {
    	vm.grid_template_rows_arr.push({value: 1, unit: 'fr', repeat: 1});
    	vm.creatRowsString();
    	setTimeout(() => $('select').material_select(), 0);
    }
    vm.removeRow = (index) => {
    	vm.grid_template_rows_arr.splice(index, 1);
    	vm.creatRowsString();
    	setTimeout(() => $('select').material_select(), 0);
    }
    /*################### */


    vm.container_height = '';
    vm.grid_column_gap = 15;
    vm.grid_row_gap = 15;
    vm.justify_items = 'stretch';
    vm.align_items = 'stretch';
    vm.justify_content = 'stretch';
    vm.align_content = 'stretch';
    vm.grid_auto_columns = { value: 30, unit: 'px'};
    vm.grid_auto_rows = { value: 30, unit: 'px'};
    vm.grid_auto_flow = 'row';
    vm.ghosts = new Array(250);

    vm.updateGhosts = () => {
        vm.ghosts = vm.container_height ? new Array(vm.items.length) : new Array(250);
    }

    vm.items = [];

    vm.createNewItem = () => {
    	vm.items.push({'grid-column-start': {type: 'auto', value: ''}, 'grid-column-end': {type: 'auto', value: ''}, 'grid-row-start': {type: 'auto', value: ''}, 'grid-row-end': {type: 'auto', value: ''}, 'justify-self': 'auto', 'align-self': 'auto', 'colour': colours[Math.floor(Math.random()*colours.length)]});
        vm.updateGhosts();
    }

    for (var i = 0; i < vm.natural_rows*vm.natural_cols; i++) {
    	vm.createNewItem();
    }

    vm.getItemCells = (item) => {
        if(item['grid-column-start'].type == 'auto') {
            return 1;
        }
    }


    vm.extra_top_rows = 0;
    vm.extra_top_rows_text = '';

    vm.extra_right_cols = 0;
    vm.extra_left_cols = 0;
    vm.extra_right_cols_text = '';
    vm.addExtraRows = () => {
        vm.extra_top_rows = 0;
        vm.extra_right_cols = 0;
        vm.extra_left_cols = 0;
        for (var i = vm.items.length - 1; i >= 0; i--) {

            let row_start_type = vm.items[i]['grid-row-start']['type'];
            let row_end_type = vm.items[i]['grid-row-end']['type'];
            let row_start_val = parseInt(vm.items[i]['grid-row-start']['value']) || 0;
            let row_end_val = parseInt(vm.items[i]['grid-row-end']['value']) || 0;

            if(row_start_type == 'span' && row_end_type == 'line' && row_start_val && row_end_val) {
                if(row_start_val >= row_end_val) {
                    let extra_top_rows_f = row_start_val - row_end_val + 1;
                    vm.extra_top_rows = (extra_top_rows_f > vm.extra_top_rows) ? extra_top_rows_f : vm.extra_top_rows;
                }
            }
            if(row_end_type == 'line' && !row_start_val && row_end_val == 1) {
                vm.extra_top_rows = (row_end_val > vm.extra_top_rows) ? row_end_val : vm.extra_top_rows;
            }

            let col_start_type = vm.items[i]['grid-column-start']['type'];
            let col_end_type = vm.items[i]['grid-column-end']['type'];
            let col_start_val = parseInt(vm.items[i]['grid-column-start']['value']) || 0;
            let col_end_val = parseInt(vm.items[i]['grid-column-end']['value']) || 0;

            if(col_start_type == 'span' && col_end_type == 'line' && col_start_val && col_end_val) {
                if(col_end_val > col_start_val) {
                    if((col_end_val - 1) > vm.natural_cols && (col_end_val - vm.natural_cols - 1) > vm.extra_right_cols) {
                        vm.extra_right_cols = col_end_val - vm.natural_cols - 1;
                    }
                } else {
                    let extra_left_cols_f = col_start_val - col_end_val + 1;
                    let extra_right_cols_f = col_end_val - 1 - vm.natural_cols;
                    vm.extra_right_cols = (extra_right_cols_f > vm.extra_right_cols) ? extra_right_cols_f : vm.extra_right_cols;
                    vm.extra_left_cols = (extra_left_cols_f > vm.extra_left_cols) ? extra_left_cols_f : vm.extra_left_cols;
                }
            } else if(col_start_type == 'span' && col_end_type != 'line') {
                vm.extra_right_cols = (col_start_val > vm.natural_cols && (col_start_val - vm.natural_cols) > vm.extra_right_cols) ? (col_start_val - vm.natural_cols) : vm.extra_right_cols;
            } else if(col_start_type == 'line' && col_end_type == 'line' && col_end_val == col_start_val) {
                let max = col_start_val;
                vm.extra_right_cols = (max > vm.natural_cols && (max - vm.natural_cols) > vm.extra_right_cols) ? max - vm.natural_cols : vm.extra_right_cols;
            } else {
                let start = (col_start_type == 'auto' || !col_start_val) ? 0 : col_start_val;
                let end = 0;
                if(col_end_type == 'line') {
                    end = col_end_val ? col_end_val : 0; 
                } else if(col_end_type == 'span') {
                    end = col_end_val ? (start + col_end_val) : 0;
                }
                if(!start && col_end_type == 'line' && col_end_val == 1) {
                    vm.extra_left_cols = (col_end_val > vm.extra_left_cols) ? col_end_val : vm.extra_left_cols;
                } else if(!start && col_end_type == 'span' && col_end_val > vm.natural_cols) {
                    vm.extra_right_cols = ((col_end_val - vm.natural_cols) > vm.extra_right_cols) ? (col_end_val - vm.natural_cols) : vm.extra_right_cols;
                } else if(!end && col_start_type == 'line' && col_start_val > vm.natural_cols) {
                    vm.extra_right_cols = ((col_start_val - vm.natural_cols) > vm.extra_right_cols) ? (col_start_val - vm.natural_cols) : vm.extra_right_cols;
                } else if(!end && col_start_type == 'span' && col_start_val > vm.natural_cols) {
                    vm.extra_right_cols = ((col_start_val - vm.natural_cols) > vm.extra_right_cols) ? (col_start_val - vm.natural_cols) : vm.extra_right_cols;
                } else {
                    let max = Math.max(start, end);
                    let min = Math.min(start, end);
                    max = Math.max(min, max - 1);
                    vm.extra_right_cols = (max > vm.natural_cols && (max - vm.natural_cols) > vm.extra_right_cols) ? max - vm.natural_cols : vm.extra_right_cols;
                }
            }   

        }
        vm.extra_right_cols_text = vm.extra_right_cols ? ` repeat(${vm.extra_right_cols}, ${vm.grid_auto_columns.value}${vm.grid_auto_columns.unit})` : '';
        vm.extra_left_cols_text = vm.extra_left_cols ? `repeat(${vm.extra_left_cols}, ${vm.grid_auto_columns.value}${vm.grid_auto_columns.unit}) ` : '';
        vm.extra_top_rows_text = vm.extra_top_rows ? `repeat(${vm.extra_top_rows}, ${vm.grid_auto_rows.value}${vm.grid_auto_rows.unit}) ` : '';
    }

    vm.getGridItemValue = (obj) => {
        if(obj.type == 'line') {
            return obj.value ? obj.value + '' : 'auto';
        }
        if(obj.type == 'span') {
            return obj.value ? `span ${obj.value}` : 'auto';
        }
        return 'auto';
    }

    vm.removeItem = (i) => {
        vm.items.splice(i, 1);
        if(vm.items.length == i) vm.selected_item = i - 1;
    }

    vm.refresh = () => {
        setTimeout(() => $('select').material_select(), 0);
    }

    vm.toggleItem = (i) => {
        vm.selected_item = (vm.selected_item == -1 || vm.selected_item != i) ? i : -1; 
        vm.refresh();
    }
   
}]);

$(document).ready(function() {
    $('select').material_select();
    $('.tooltipped').tooltip({delay: 50});
    $('.modal').modal();
});

$(window).load(function() {
	$('body').removeClass('loading');
})