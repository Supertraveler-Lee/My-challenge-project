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
  addbtn: $('#add_btn'),
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
  },
  'email': function() {
    var text = this.ipt.value;
    if (text === "") {
      if (this.data.necessary) {
        this.error_tip(0);
      } else {
        this.default_tip();
        return true;
      }
    } else {
      if (/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[a-z0-9]+.){1,63}[a-z0-9]+$/.test(text)) {
        this.true_tip();
        return true;
      } else {
        this.error_tip(1);
      }
    }
    return false;
  },
  'phone': function() {
    var text = this.ipt.value;
    if (text === "") {
      if (this.data.necessary) {
        this.error_tip(0);
      } else {
        this.default_tip();
        return true;
      }
    } else {
      if (/^\d{11}$/.test(text)) {
        this.true_tip();
        return true;
      } else {
        this.error_tip(1);
      }
    }
    return false;
  },
  'radio': function() {
    var item = $('#' + this.data.id.getElementByTagName('input'));
    for (var i = 0; i < item.length; i++) {
      if (item[i].checked) {
        this.true_tip();
        return true;
      }
    }
    if (this.data.necessary) {
      this.error_tip(0);
    } else {
      this.default_tip();
      return true;
    }
    return false;
  },
  'checkbox': function() {
    var children = this.ipt.children;
    for (var i in children) {
      if (children[i].checked) {
        this.true_tip();
        return true;
      }
    }
    if (this.data.necessary) {
      this.error_tip(0);
    } else {
      this.default_tip();
      return true;
    }
    return false;
  },
  'select': function() {
    this.true_tip();
    return true;
  }
};

var data_product = new Data_product(data_box),
  tagIpt = new TagIpt(data_box.item_box[0], data_box.item_box[1], 100),
  formArr = [];

data_product.init();
tagIpt.init();

//添加菜单
on(data_product.box.add_btn, 'click', function() {
  var data = data_product.getData();
  if (data != null) {
    data_product.addForm(data);
    formArr.push(new Form(data));
    if (data.type === 'radio' || data.type == 'checkbox') {
      formArr[formArr.length - 1].default_tip();
    }
  }
});

//提交菜单
on(data_box.submit_form, 'click', function() {
  var text = "";
  for (var i = 0; i < formArr.length; i++) {
    text += !formArr[i].validator() ? formArr[i].tip.textContent + '\n' : "";
  }
  text === "" ? alert('提交成功') : alert(text);
});


function $(selector) {
  return document.querySelector(selector);
}

function on(elem, event, handler) {
  if (elem.addEventListener) {
    elem.addEventListener(event.handler);
  } else if (elem.attachElement) {
    elem.attachElement("on" + event, handler);
  } else {
    elem['on' + event] = handler;
  }
}


//数据产生
function Data_product(data_box) {
  this.box = data_box;
  this.id = 0;
}

Data_product.prototype = {
    init: function() {
      this.addEvent();
    },

    addEvent: function() {
      //根据选择呈现对应的表单
      on($('#form_create'), 'change', this.showTable.bind(this));
      //选择样式一还是样式二
      on($(this.box.style_box.box), 'change', this.setStyle.this.bind(this));
    },

    getText: function(data_box) {
      return data_box.box[data_box.value];
    },

    showTable: function(e) {
      if (e.target.getAttribute('type') == 'radio') {
        e.target.parentNode.parentNode.className = e.target.id; //???
        if (!/necessary/.test(e.target.id)) {
          this.box.label_box.value = e.target.parentNode.textContent;
        }
      }
    },
    getData: function() {
      var data = {
        label: '',
        type: '',
        necessary: true,
        input_type: '',
        min_length: 0,
        max_length: 1,
        default_tip: '',
        success_text: '',
        item: [],
        fail_text: '',
        id: 0,
        validator: function() {}
      };

      data = this.getBaseData(data);
      switch (data.type) {
        case 'textarea':
          data = getLengthRelativaData(data);
          break;
        case 'input':
          switch (data.input_type) {
            case 'text':
            case 'password':
              data = this.getLengthRelativaData(data);
              break;
            case 'number':
            case 'email':
            case 'phone':
              data = this.getInputRelativeData(data);
              break;
          }
          break;
        case 'radio':
        case 'select':
        case 'checkbox':
          data = this.getSpecialInputRelativeData(data);
          break;
      }
      return data;
    },

    getBaseData: function(data) {
      data.label = this.getText(this.box.label_box);
      data.type = this.getText(this.box.type_box);
      data.necessary = this.getText(this.box.necessary_box) == "necessary";
      data.input_type = this.getText(this.box.input_type_box);
      data.id = 'form' + this.id++;
      return data;
    },

    setStyle: function() {
      var text = this.getText(this.box.style_box);
      this.box.result_box.className = text == '样式一' ? style1 : style2;
    },

    // 总的添加表格的逻辑
    addForm: function(data) {
      switch (data.type) {
        case 'input':
          this.addInputForm(data);
          break;
        case 'textarea':
          this.addTextAreaForm(data);
          break;
        case 'radio':
          this.addRadioForm(data);
          break;
        case 'checkbox':
          this.addCheckboxForm(data);
          break;
        case 'select':
          this.addSelectForm(data);
          break; //??
      }
    },
    //配置radio select checkbox
    getSpecialInputRelativeData : function(data) {
      var items = this.box.item_box[2];
      data.item = [];
      for(var i=0;i<items.length;i++) {
        data.item.push(items[i].childNode(1).data);
      }
      if(items.length == 0) {
        alert('你还没有添加'+data.label);
        data = null;
      } else if(items.length == 1) {
        alert('你只添加了一个选项，无法创建'+data.label);
      } else {
        data.default_text = (data.necessary?'必填':'选填')+ ',请选择您的'+data.label;
        data.fail_text = [data.label+'未选择'];
        data.success_text = [data.label+'已选择'];
        data.validator = validator[data.type];
      }
      return data;
    },
    getLengthRelativaData: function(data) {
      data.min_length = this.getText(this.box.min_length_box);
      data.max_length = this.getText(this.box.max_length_box);
      data.fail_text = [
        data.label + '不能为空',
        data.label + '长度不能小于' + data.min_length + '个字符',
        data.label + '长度不能大于' + data.max_length + '个字符',
      ];
      data.success_text = data.label + "格式正确";
      data.default_text = (data.necessary? '必填':'选填')+',长度为'+data.min_length+'-'+data.max_length+'个字符';
      data.validator = validator.length_control;
      return data;     
    }

    //配置number phone email
    getInputRelativeData: function(data) {
      data.input_type = this.getText(this.box.input_type_box);
      data.fail_text = [
        data.label + '不能为空'，
        data.label + '格式正确'
      ]
      data.success_text = data.label +'格式正确';
      data.default_text = (data.necessary?'必填':'选填')+',请输入您的'+ data.label;
      data.validator = validator[data.input_type];
      return data;
    },
    //添加表单
    addInputForm : function(data) {
      var box = document.createElement('div');
      box.innerHTML = '<label>'+data.label+'</label><input> type="'+ data.input_type +'id="'+data.id+'"><span></span>';
      this.box.result_box.insertBefore(box,this.box.submit_form);  
    },
    addTextAreaForm: function(data) {
      var box = document.createElement('div');
      box.innerHTML = '<label>'+ data.label+'</label><textarea id="'+data.id+'"></textarea?<span></span>';
      this.box.result_box.insertBefore(box,this.box.submit_form);
    },
    addRadioForm: function(data) {
      var box = document.createElement('div'),
        text = '';
      box.className = 'radio_box';

    }