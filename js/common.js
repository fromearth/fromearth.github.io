$(function() {
    // スムーズスクロール
    if (!$("#page-top")[0]) {
        $("body").append('<a href="#" id="page-top">PAGE TOP ▲</a>');
    }
    var pageTop = $('#page-top');
    pageTop.css({"position":"fixed",
                    "bottom":"60px",
                    "right":"40px",
                    "background":"#7e7a7a",
                    "borderRadius":"5px",
                    "fontSize":"12px",
                    "opacity":"0.5",
                    "padding":"10px"}).hover(function(){$(this).css("opacity","0.8");},function(){$(this).css("opacity","0.5");});
    pageTop.hide();
    $(window).scroll(function () {
        if ($(this).scrollTop() > 600) {
            pageTop.fadeIn();
        } else {
            pageTop.fadeOut();
        }
    });
    pageTop.click(function () {
        $('body, html').animate({scrollTop:0}, 700, 'swing');
        return false;
    });

    // ロールオーバー効果
    $("a[href*='/'] img").hover(
        function() {
            $(this).fadeTo("slow",0.4);
        },
        function() {
            $(this).fadeTo("slow",1.0);
        }
    );

    // ポップアップ画像表示
    if ($("img.popup")[0]) {
        // ポップアップ作成
        $(document).on("click","img.popup",function() {
            // オーバーレイの準備
            if (!$("#overlay")[0]) {
                $("body").append('<div id="overlay"></div>');
            }
            // ポップアップ領域の準備
            if (!$("#popup")[0]) {
                $("body").append('<div id="popup"></div>');
            }
            $("#popup").html('<img src="'+$(this).attr("src")+'">');
            // 画像幅を取得
            var w = getImageWidth($(this).attr("src"));
            var newW = w > $(window).width() ? ($(window).width() - 80) : (w + 40);
            $("#popup").css("width",newW+'px');
            // ポップアップを中央に設定
            var top  = Math.floor(($(window).height() - $("#popup").height()) / 2); 
            var left = Math.floor(($(window).width() - $("#popup").width()) / 2);  
            $("#popup").css({"top":top,"left":left,"overflow":"auto"});

            // 表示
            $("#overlay").show();
            $("#popup").fadeIn("slow");
        });
        // ポップアップ中にどこか押したら解除
        $(document).on("click","#popup,#overlay",function() {
            $("#popup").fadeOut("slow");
            $("#overlay").hide();
        });
    }

    // ツールチップ起動
    $("[data-toggle='tooltip']").tooltip().click(function(e) {
        e.preventDefault();
    });
});

function getImageWidth(url) {
    var img = new Image();
    img.src = url;

    return img.width;
}
