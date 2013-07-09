$(document).ready(function(){

//Initial variable values
	var answer = Math.floor((Math.random()*100)+1);
	console.log(answer);
	var attempts = 1;
	var prev_distance = null;
	var distance = null;
	var guesses = [];

//Gets whats in the text box and calls the function submit
	function info(){
		$("#submit").click(submit);
		$("#guess").keydown(function(enter){
			if(enter.keyCode == 13){
				submit();
			}
		});
	}

	info();
//Sets the number in the text box to variable guess and calls validate to see if the number is between 1 and 100
	function submit(){
		var guess = $('#guess').val();
		validate(guess);
	}

//Validates whether the user's guess is a number between 1 and 100
	function validate(guess){
		//press submit or enter w/o a number entered
		if(guess == ""){
			$('#info').html('You didn\'t guess anything. Try again!');
			return;
		}
		//value is not in range
		else if(guess>100 || guess < 1 || isNaN(guess)){
			$('#info').html('ERROR: You\'re guess must be a number between 1 and 100').css({color:'red'});
			return;
		}

		//once value is valid we set a distance equal to the difference between answer and guess
		distance = Math.abs(answer - guess);

		//if they guess correctly
		if (guess == answer){
			$('#info').html('Congrats! You got it in ' + attempts + ' attempts!');
			return;
		}
		//checking to see if they do not have a previous value, meaning this is their first guess
		else if(prev_distance == null){
			firstGuess(guess, answer);
		}
		//giving them a hint whether they are getting closer or further 
		else{
			hotOrCold(prev_distance, distance, guess, answer);
		}
		prev_distance = distance;
		$('.guesses').show()
		$('#pa_items').append(guess + ', ');
	}

//gives the initial feedback to the user whether thier guess is to large or small and increments the attmepts by 1
	function firstGuess(guess, answer){
		if(guess < answer){
			$('#info').html('Your guess was too SMALL').css({color:'#000'}).effect('highlight', {color: '#FFFFE0'}, 2000);
		}
		else if(guess > answer){
			$('#info').html('Your guess was too LARGE').css({color:'#000'}).effect('highlight', {color: '#FFFFE0'}, 2000);
		}
		attempts++;
		$('#pa').append('Previous Attempt:');
	}

//tell the user whether they are getting closer or further from answer. Also tells them if they are to high or low
	function hotOrCold(prev_distance, distance, guess, answer){
		if(prev_distance > distance){
			if(guess > answer)
				$('#info').html('You\'re getting closer! But you\'re to high!').css({color:'#000'}).effect('highlight', {color: '#FF0000'}, 2000);
			else
				$('#info').html('You\'re getting closer! But you\'re to low!').css({color:'#000'}).effect('highlight', {color: '#FF0000'}, 2000);
		}
		if(prev_distance < distance){
			if(guess > answer)
				$('#info').html('You\'re getting further from the answer! And you\'re to high!').css({color:'#000'}).effect('highlight', {color: '#0000FF'}, 2000);
			else
				$('#info').html('You\'re getting further from the answer! And you\'re to low!').css({color:'#000'}).effect('highlight', {color: '#0000FF'}, 2000);
		}
		attempts++;
	}

//resets the answer to a new random number and resets the attempts to 1
	$('#newgame').click(function(e){
		e.preventDefault();
		answer = Math.floor((Math.random()*100)+1);
		console.log(answer);
		attempts = 1; 
		prev_distance = null;
		$('#info').html('');
		$('#guess').val('');
		$('#pa').html('');
		$('#pa_items').html('');
	});
});