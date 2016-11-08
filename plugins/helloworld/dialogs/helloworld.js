function selectImg(id) {
    var e = window.document.getElementById('selectResult');
    if (e) {
        e.setAttribute('value',id);
    }
}
(function () {
    function HelloWorldDialog(editor) {

        var category = [
							[ 'label1', 'value1' ],
							[ 'label2', 'value2' ],
							[ 'label3', 'value3' ],
							[ 'label4', 'value4' ],
							[ 'label5', 'value5' ]
						];
        return {
            title: '来源于图片库',
            minWidth: 600,
            minHeight: 400,
            buttons: [{
                type: 'button',
                id: 'someButtonID',
                label: '自定义Button',
                onClick: function () {
                    //alert('Custom Button');
                }
				},
				CKEDITOR.dialog.okButton,
				CKEDITOR.dialog.cancelButton
			],
            contents:
            [
                {
                    id: 'info',
                    label: '名字',
                    title: '名字',
                    elements:
                    [
                        {
                            id: 'selectResult',
                            type: 'html',
                            label: '选定图片',
                            html: '<div><input type="hidden" id="selectResult" /></div>',
                            required: true,
                            validate: CKEDITOR.dialog.validate.notEmpty('内容不能为空'),
                            commit: function () {
                                /*var text = '<img src="'+this.getValue()+'"/>';
                                var element = new CKEDITOR.dom.element('img', editor.document);
                                element.setText(text);
                                editor.insertElement(element);
								*/
                                var doc = this.getElement().getDocument();
                                var element = doc.getById('selectResult');
                                var id = element.getAttribute('value');
                                CKEDITOR.ajax.load('http://localhost:8080/user/imageList.do', function( data ) {
                                    if(data){
                                        data = JSON.parse(data);
                                        var imageElement = editor.document.createElement( 'img' );
                                        imageElement.setAttribute( 'alt', 'sss流量' );
                                        imageElement.setAttribute( 'src', data[id] );
                                        editor.insertElement( imageElement );
                                    }
                                });

                            }
                        },
						{
							id: 'category',
							type: 'select',
							items: category,
							label: '分类',
							onChange: function() {
								alert(this.getValue());
							},
							setup: function( type, element ) {
								alert('setup');
							},
							commit: function( type, element ) {
								
							}
						},
						{
							id: 'mainContent',
							type: 'html',
							html: '<div id="myDiv"></div>',
							label: '内容',
							setup: function( type, element ) {
								alert('setup');
							},
							onLoad: function (me, element) {

							},
							commit: function( type, element ) {
								
							}
						}
                    ]
                }
            ],
            onLoad: function () {
                var document = this.getElement().getDocument();
                var doc = CKEDITOR.dom.document;
                var element = document.getById('myDiv');
                if (element) {
                    // 从后台请求数据
                    CKEDITOR.ajax.load('http://localhost:8080/user/imageList.do', function( data ) {
                        var _html = '<div><p>';
                        if(data){
                            data = JSON.parse(data);
                            for (var i = 0; i < data.length; i++){
                                _html += '<img onclick="selectImg('+i+')"  style="width: 250px;" src="'+data[i]+'" />';
                            }
                        }
                        _html +='<img src="http://localhost:8080/user/image.do">';
                        _html += '</p></div>';
                        element.setHtml(_html);
                    });
                }

            },
            onShow: function () {
                //alert('onShow');
            },
            onHide: function () {
                //alert('onHide');
            },
            onOk: function () {
                this.commitContent();
            },
            onCancel: function () {
                //alert('onCancel');
            },
            resizable: CKEDITOR.DIALOG_RESIZE_HEIGHT
        };
    }

    CKEDITOR.dialog.add('helloworld', function (editor) {
        return HelloWorldDialog(editor);
    });
})();