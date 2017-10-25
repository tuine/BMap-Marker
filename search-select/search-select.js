var SearchSelect = function (config) {
    this.config = config;
    this.targetEle = null;
    this.switchLoadData = true;
    this.currentSelect = undefined;
    this.field = 'name';
    this.dataValue = null;
    this.timer = null;
    this.sensitive = false;
    this.isAjax = false;
    this.sourceData = null;
    this.filterColumn = ['name'];
    this.render();
}

SearchSelect.prototype.render = function () {
    var self = this;
    for(var p in this.config) {
        if(this.config.hasOwnProperty(p)){
            this[p] = this.config[p];
        }
    };
    var selectContainer = document.createElement("div");
    selectContainer.setAttribute("class","select-container");
    this.searchInput = document.createElement("input");//搜索框
    this.searchInput.setAttribute("class","search-input");
    this.searchInput.onclick = function (e) {
        var event = e || window.event;
        event.cancelBubble || event.stopPropagation();
        var searchPanel = document.getElementsByClassName("search-panel");
        for(var i = 0,l = searchPanel.length;i < l; i++){
            searchPanel[i].style.display = "none";
        }
        self.searchPanel.style.display = "block";
        if(!self.switchLoadData) return;
        self.switchLoadData = false;
        self.loadingSpan.style.display = "block";
        self._getData();
    };

    this.searchInput.onkeyup = function () {
        var keyWord = this.value;
        clearTimeout(self.timer);
        self.timer = setTimeout(function () {
            self._getData(keyWord);
        },500)
    }
    document.onclick = function (e) {
        var event = e || window.event;
        event.cancelBubble || event.stopPropagation();
        var searchPanel = document.getElementsByClassName("search-panel");
        for(var i = 0,l = searchPanel.length;i < l; i++){
            searchPanel[i].style.display = "none";
        }
    }
    selectContainer.appendChild(this.searchInput);
    this.searchPanel = document.createElement("div");
    this.searchPanel.setAttribute("class","search-panel");
    this.searchPanel.onclick = function (e) {
        var event = e || window.event;
        event.cancelBubble || event.stopPropagation();
        this.style.display = "block";
    };
    this.searchPanelUl = document.createElement("ul");
    this.searchPanelUl.setAttribute("class","search-panel-ul");
    this.searchPanel.appendChild(this.searchPanelUl);
    selectContainer.appendChild(this.searchPanel);
    this.loadingSpan = document.createElement("span");
    var loadingGif = document.createElement("img");
    loadingGif.src = "./img/loading.gif";
    this.loadingSpan.setAttribute("class","loading-span");
    this.loadingSpan.appendChild(loadingGif);
    this.searchPanel.appendChild(this.loadingSpan);
    this.targetEle.parentNode.replaceChild(selectContainer,this.targetEle);
}

SearchSelect.prototype.createLi = function () {
    var li = document.createElement("li");
    return li;
}

SearchSelect.prototype.pushData = function (data) {
    var frag = document.createDocumentFragment();
    this.data = data;
    for(var i = 0,l = data.length; i < l; i++) {
        var li = this.createLi();
        li.innerHTML = this.field ? data[i][this.field] : data[i];
        li.setAttribute("data-array-num",i);
        if (this.dataValue) {
            li.setAttribute("data-value", data[i][this.dataValue]);
        }
        frag.appendChild(li)
    }
    this.searchPanelUl.appendChild(frag);
    this.searchPanelLiClick();
    this.loadingSpan.style.display = "none";
    this.switchLoadData = true;
}

SearchSelect.prototype.searchPanelLiClick = function () {
    var self = this;
    var childNodeLi = this.searchPanelUl.childNodes;
    for(var i = 0, l = childNodeLi.length; i < l; i++) {
        if(childNodeLi[i].nodeName=="LI"){
            (function (num){
                childNodeLi[num].onclick = function (e) {
                    var event = e || window.event;
                    event.cancelBubble || event.stopPropagation();
                    self.searchInput.value = this.innerHTML;
                    self.searchPanel.style.display = "none";
                    var num = parseInt(this.getAttribute("data-array-num"));
                    getSelectData(num);
                }
            })(i)
        }
    }

    var getSelectData = function (num) {
        for(var i = 0, l = self.data.length; i < l; i++) {
            if(i == num) {
                self.currentSelect = self.data[i];
                break;
            }
        }
        self.selectCallBack(self.currentSelect)
    }
};

SearchSelect.prototype.getSelectData = function () {
    return this.currentSelect;
}

SearchSelect.prototype.selectCallBack = function (data) {
    return data;
}

SearchSelect.prototype._getData = function (keyWord) {
    if (keyWord && !this.sensitive) {//不是大小写敏感转换搜索词
        keyWord = keyWord.toLowerCase();
    }
    this.loadingSpan.style.display = "block";
    this.searchPanelUl.innerHTML = null;//清除li
    if (this.isAjax) {
        this.getData(keyWord);//自定义getData:函数名-->查询结果使用searchSelect.pushData([{name:"luwenwei"},{name:"yuhuahui"}])
    } else {
        this.filter(keyWord);
    }
}

SearchSelect.prototype.filter = function (keyWord) {
    if (this.sourceData) {//设置原始数据
        if (keyWord) {
            var data = this.sourceData,item,v,push_data=new Array();
            for (var i = 0, l = data.length; i < l; i++) {
                item = data[i];
                for (var j = 0, len = this.filterColumn.length; j < len; j++) {
                    v = item[this.filterColumn[j]];
                    if (this.sensitive) {
                        v = v.toString();
                    } else {
                        v = v.toString().toLowerCase();
                    }
                    if (v.indexOf(keyWord) != -1) {
                        push_data.push(item);
                        break;
                    }
                }
            }
            this.pushData(push_data);
        } else {
            this.pushData(this.sourceData);
        }
    }
}