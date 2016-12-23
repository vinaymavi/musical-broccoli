/**
 * Created by vinaymavi on 23/12/16.
 */


function Tambola() {
    var NUMBER_OF_ROW = 9;
    var NUMBER_OF_COLUMNS = 10;
    var STORAGE_NAME = "tambola";
    var _this = this;
    var $tableSel;

    function _createTable() {
        var tHtml = _createTableHtml();
        $tableSel.html(tHtml);
    };

    function _createTableHtml() {
        var count = 1;
        var tHtml = "";
        for (i = 1; i <= NUMBER_OF_ROW; i++) {
            var html = "";
            html += "<tr>";
            for (j = 1; j <= NUMBER_OF_COLUMNS; j++) {
                html += "<td data-value=" + count + " data-active=false>" + count++ + "</td>";
            }
            html += "<tr>";
            tHtml += html;
        }
        return tHtml;
    }

    function _updateCells() {
        var arr = JSON.parse(localStorage.getItem(STORAGE_NAME));
        $tableSel.find("td").each(function () {
            if (arr && arr.indexOf($(this).data('value')) != -1) {
                _removeClasses(this);
                $(this).addClass("previous-number");
            }
        });
    }

    function _registerListener() {
        $tableSel.find('td').on("click", function () {
            var self = this;
            if ($(this).data("active")) {
                _removeClasses(this);
                $(this).addClass("remaining-number");
                $(this).data("active", false);
                var arr = JSON.parse(localStorage.getItem(STORAGE_NAME));
                console.log(JSON.stringify(arr));
                console.log(arr.splice(arr.indexOf($(this).data("value")), 1));
                console.log(JSON.stringify(arr));
                localStorage.setItem(STORAGE_NAME, JSON.stringify(arr));
            } else {
                if (localStorage.getItem(STORAGE_NAME)) {
                    var arr = JSON.parse(localStorage.getItem(STORAGE_NAME));
                    arr.push($(this).data("value"));
                } else {
                    var arr = [];
                    arr.push($(this).data("value"));
                }
                _updateCells();
                $(this).data("active", true);
                _removeClasses(this);
                $(this).addClass("current-number");
                localStorage.setItem(STORAGE_NAME, JSON.stringify(arr));
            }
        });
    }

    function _removeClasses(_this) {
        if ($(_this).hasClass("current-number")) {
            $(_this).removeClass("current-number");
        }
        if ($(_this).hasClass("previous-number")) {
            $(_this).removeClass("previous-number");
        }
        if ($(_this).hasClass("remaining-number")) {
            $(_this).removeClass("remaining-number");
        }
    }

    _this.init = function ($sel) {
        if (typeof $sel !== "undefined") {
            $tableSel = $sel;
        }
        _createTable();
        _registerListener();
        _updateCells();
    }
}


$(document).ready(function () {
    var tambola = new Tambola();
    tambola.init($("table"));
});
