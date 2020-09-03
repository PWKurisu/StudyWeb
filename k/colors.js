var Body = {
    setColor:function(color) {
        document.querySelector('body').style.color = color;
    },
    setBackgroungColor:function(color) {
        document.querySelector('body').style.backgroundColor = color;
    }
}

var Licks = {
    setColor:function(color) {
        var alist = document.querySelectorAll('a');
        for(var i = 0; i < alist.length; i++) {
            alist[i].style.color = color;
        }
    }
}

function nightDayHandler(self) {
    if(self.value == 'day') {
        Body.setBackgroungColor('black');
        Body.setColor('white');
        self.value = 'night';
        Licks.setColor('powderblue');
    } else {
        Body.setColor('black');
        Body.setBackgroungColor('white');
        Licks.setColor('blue');
        self.value = 'day';
    }
}