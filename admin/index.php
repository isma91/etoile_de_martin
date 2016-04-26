<!-- <iframe id="blockrandom" src="https://www.helloasso.com/associations/l-etoile-de-martin/formulaire-don" scrolling="no">Pas d'Iframe</iframe>
<button class="click">aa</button>
<script type="text/javascript">
	$('.click').click(function () {
		console.log($('#blockrandom').contents().find('#ctl09_prenom').());

	});
</script> -->
<style type="text/css">
body {
	border:0;
	margin: 0;
}
	.block {
		position: absolute;
		z-index: 99999;
		width: 200px;
		border-right: 1px solid black;
		background-color: #aaa;
		margin-left: -201px;
		height: 100%;
	}
	.block input {
		width: 100%;
	}

</style>
<script type="text/javascript" src="https://code.jquery.com/jquery-2.2.3.min.js"></script>
<body>
	
<button class="user">a</button>
<div class="block">
	<input type="text">
	<input type="text">

</div>
<script type="text/javascript">
	$('.user').on('click', function () {
		console.log('enter');
		if ($('.block').css('marginLeft') == '-201px') {
			$('.block').animate({
				marginLeft: '0px'
			}, 500);
			console.log($('.block').css('marginLeft'));
		} else if ($('.block').css('marginLeft') == '0px') {
			$('.block').animate({
				marginLeft: '-201px'
			}, 500);
			console.log($('.block').css('marginLeft'));
		}
	});
</script>
</body>