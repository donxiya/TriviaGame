
var game = {
    countRight: 0,
    countWrong: 0,
    timeUpdate: null,
    timeStop: null,
    selection: null,
    slideOrder: 0,
    answerList: [0, 1, 2, 3],
    slideList: [
        {
            tag: "Question Template",
            question: "Q 0 ?",
            answer: 0,
            choiceList: [{ choice: "string0", num: 0 }, { choice: "string1", num: 1 }, { choice: "string2", num: 2 }, { choice: "string3", num: 3 }],
            result: null,
            gifID: 0,
        },
        {
            tag: "Question Template",
            question: "Q 1 ?",
            answer: 0,
            choiceList: [{ choice: "string0", num: 0 }, { choice: "string1", num: 1 }, { choice: "string2", num: 2 }, { choice: "string3", num: 3 }],
            result: null,
            gifID: 0,
        },
        {
            tag: "Question Template",
            question: "Q 2 ?",
            answer: 0,
            choiceList: [{ choice: "string0", num: 0 }, { choice: "string1", num: 1 }, { choice: "string2", num: 2 }, { choice: "string3", num: 3 }],
            result: null,
            gifID: 0,
        },
        {
            tag: "Question Template",
            question: "Q 3 ?",
            answer: 0,
            choiceList: [{ choice: "string0", num: 0 }, { choice: "string1", num: 1 }, { choice: "string2", num: 2 }, { choice: "string3", num: 3 }],
            result: null,
            gifID: 0,
        },
    ],
    slideshowUpdate: function (ord) {
        game.timer();
        game.timeStop = setTimeout(function () { game.confirmAnswer() }, 30000);
        $("#victoryScene").slideUp(500);
        $("#defeatScene").slideUp(500);
        $("#gameBody").slideDown(500);
        $("#question").text(game.slideList[ord].question);
        $("#choice0").text(game.slideList[ord].choiceList[0].choice);
        $("#choice1").text(game.slideList[ord].choiceList[1].choice);
        $("#choice2").text(game.slideList[ord].choiceList[2].choice);
        $("#choice3").text(game.slideList[ord].choiceList[3].choice);
    },
    slideshowBody: function () {
        $("#choice0").click(function () { game.selectAnswer(0); clearTimeout(game.timeStop); });
        $("#choice1").click(function () { game.selectAnswer(1); clearTimeout(game.timeStop); });
        $("#choice2").click(function () { game.selectAnswer(2); clearTimeout(game.timeStop); });
        $("#choice3").click(function () { game.selectAnswer(3); clearTimeout(game.timeStop); });
    },
    selectAnswer: function (sel) {
        game.selection = sel;
        $("#choice" + sel).addClass("answerContainerClick").removeClass("default");
        $("#confirm").text("Confirm");
        for (i = 0; i <= game.answerList.length; i++) {
            if (game.answerList[i] != sel) {
                $("#choice" + i).removeClass("answerContainerClick").addClass("answerContainer");
            }
        }
    },
    confirmAnswer: function () {
        for(i=0; i<=4; i++){
            $("#choice" + i).removeClass("answerContainerClick").addClass("answerContainer");
        };
        $("#confirm").text("Skip");
        console.log("slide num: " + game.slideOrder);
        if (game.selection != null) {
            if (game.selection === game.slideList[game.slideOrder].answer) {
                game.selection = null;
                game.countRight += 1;
                clearInterval(game.timeUpdate);
                console.log("correct");
                $("#victoryScene").slideDown(500);
                $("#gameBody").slideUp(500);
                $("#answerSlot").text(game.slideList[game.slideOrder].answer);
                if (game.slideOrder == (game.slideList.length - 1)) {
                    console.log("end");
                    $("#resultSlotR").text(game.countRight);
                    $("#resultSlotW").text(game.countWrong);
                    $("#victoryScene").delay(5000).slideUp(500);
                    $("#endScene").delay(5500).slideDown(500);

                } else {
                    game.slideOrder++;
                    console.log("next slide");
                    setTimeout(function () { game.slideshowUpdate(game.slideOrder) }, 5000);

                }
            } else if (game.selection != game.slideList[game.slideOrder].answer) {
                game.selection = null;
                game.countWrong += 1;

                clearInterval(game.timeUpdate);
                console.log("wrong");
                $("#defeatScene").slideDown(500);
                $("#gameBody").slideUp(500);

                $("#answerSlot").text(game.slideList[game.slideOrder].answer);
                if (game.slideOrder === (game.slideList.length - 1)) {
                    console.log("end");
                    $("#resultSlotR").text(game.countRight);
                    $("#resultSlotW").text(game.countWrong);
                    $("#defeatScene").delay(5000).slideUp(500);
                    $("#endScene").delay(5500).slideDown(500);
                } else {
                    game.slideOrder++;
                    setTimeout(function () { game.slideshowUpdate(game.slideOrder) }, 5000);

                }
            }
        } else {
            clearInterval(game.timeUpdate);
            game.countWrong += 1;
            console.log("too late");
            $("#defeatScene").slideDown(500);
            $("#gameBody").slideUp(500);
            $("#answerSlot").text(game.slideList[game.slideOrder].answer);
            if (game.slideOrder < (game.slideList.length - 1)) {
                game.slideOrder++;
                setTimeout(function () { game.slideshowUpdate(game.slideOrder) }, 5000);
            }
        }

    },
    main: function () {
        game.slideshowUpdate(game.slideOrder);
        game.slideshowBody();
        $("#confirm").click(function () { game.confirmAnswer(); });
        $("#endScene").click(function(){location.reload();})
    },
    timer: function () {
        // CANVAS

        var canvas = document.getElementById('myCanvas'),
            width = canvas.width,
            height = canvas.height;

        // CANVAS PROPERTIES
        var ctx = canvas.getContext('2d');
        ctx.lineWidth = 45;
        ctx.strokeStyle = '#e8827d';
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#ef928f';
        ctx.globalCompositeOperation = 'destination-over';


        // CANVAS 
        var x = width / 2,
            y = height / 2,
            radius = 270,
            circum = Math.PI * 2,
            start = Math.PI / -2, 
            curr = 1; // Current position (in %)
        var time = 30;

        var frame = function () {
            if (time <= 0) {
                clearInterval(game.timeUpdate);
            } else {
                time--;
                $("#timer").text("Time Left: " + time);
                ctx.clearRect(0, 0, width, height);
 
                ctx.beginPath();
                // arc(x, y, radius, startAngle, endAngle, anticlockwise)
                ctx.arc(x, y, radius, start, circum * curr / 30 + start, false);
                ctx.stroke();
                curr++;
            }
        }
        game.timeUpdate = setInterval(frame, 1000);

    },
};
game.main();
