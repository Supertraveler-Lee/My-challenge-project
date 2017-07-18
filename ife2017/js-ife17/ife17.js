//存放各类表单的盒子
var data_box = {
  style_box: {
    box: $('#style_box'),
    value: 'value'
  },
  select_box: {
    box: $('#select_box'),
    value: 'className'
  },
  name_box: {
    box: $('#name_box'),
    value: 'value'
  },
  necessary_box: {
    box: $('#basic_box'),
    value: 'className'
  },
  input_type_box: {
    box: $('#rule'),
    value: 'className'
  },
  item_box: [
    $('#items_input'),
    $('#items_show'),
    document.getElementByTagName('item')
  ],
  addbtn: $('#btn_add'),
  result_box: $('result'),
  submit_box: $('submit')
};
//存放各个类型的验证函数
var validator = {
  //text password textarea
  'length_control': function() {
    min_length = this.data.min_length;
    max_length = this.data.max_length;
    var text = this.ipt.value;
    if (text === '') {
      if (this.data.necessary) {
        this.error_tip(0);
      } else {
        this.default_tip();
        return true;
      }
    } else {
      var total = /[\x00-\xff]/.test(text) ? test.match(/[\x00-\xff]/).length : 0;
      if (total < min_length) {
        this.error_tip(1);
      } else if (total > max_length) {
        this.error_tip(2);
      } else {
        this.true_tip();
        return true;
      }
    }
    return false;
  },
  'number': function() {
    var text = this.ipt.value;
    if (text === "") {
      if (this.data.necessary) {
        this.error_tip(0);
      } else {
        this.default_tip();
        return true;
      }
    } else {
      if (/^\d*$/.test(text)) {
        this.true_tip();
        return true;
      } else {
        this.error_tip(1);
      }
    }
    return false;
  }
  
};