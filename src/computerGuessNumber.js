

//Predicted number list
var population = [];
//Guess number
this.guessNumber;
//positive result
this.pNum;
//negative result
this.nNum;

var GENES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; 
var CROSSOVER_LEFT_PROBABILITY = 0.45;
var CROSSOVER_RIHT_PROBABILITY = 0.95;
var PERMUTATION_PROBABILITY = 0.03;	

//Check the guess number and save the calculate fitness 
function checkNumber(guessNumber,pNum,nNum)
{
	this.guessNumber = guessNumber;
	this.pNum = pNum;
	this.nNum = nNum;
	
	var found = false; 
	
	if(this.pNum === 0 && this.nNum === 0)
	{
		for(var i=0;i<this.guessNumber.length;i++)
		{
			var index = GENES.indexOf(Number(this.guessNumber[i]));
			if(index>=0)
				GENES.splice(index,1);
		}
	}

	var populationItem = {
		number : this.guessNumber,
		fitness : null,
		p : this.pNum,
		n : this.nNum
	};

	population.push(populationItem);
	
	for(var i=0;i<population.length;i++)
	{
		population[i]["fitness"] = cal_fitness(population[i]);
	}
	
	population.sort(function(a, b){return a.fitness - b.fitness});
			
	var newNumber = "";
	if(population.length<1)
	{
		newNumber = compare(population[0],null);
	}
	else
	{
		newNumber = compare(population[0],population[1]);
		var i = 1;
		do
		{ 
			newNumber = compare(population[0],population[1]);
			
			if(typeof population.find(obj => obj.number === newNumber)!=="undefined")
			{
				i++;
				repetition = true;
			}
			else
			{
				repetition = false;
			}
		}
		while(repetition && population.length>=i)
	}

	return newNumber;
}	

//Compare new guess number with previous highest estimated number 
//and create new number according to scope.
function compare(part1,part2)
{
	var newNumber = ""; 
	
	var pp = random_num(0, 100)/100; 
	var len = part1.number.length;

	if((part1.p + part1.n)===4)
	{
		newNumber = permutate(part1.number,len);

	}			
	else if((part1.p + part1.n)===4 && part2!=null && (part2.p + part2.n)===4)
	{
		newNumber = crossover(part1,part2);

		if(pp <= PERMUTATION_PROBABILITY)
		{
			newNumber = permutate(newNumber,len);
		}
	}
	else if((part1.p>=3 || part1.n>=3) && part2!=null && (part2.p>=1 || part2.n>=1))
	{
		newNumber = crossover(part1,part2);


		if(pp <= PERMUTATION_PROBABILITY)
		{
			newNumber = permutate(newNumber,len);			
		}				
	}
	else
	{
		newNumber = mutate(part1.number,len);
	}
	
	return newNumber;
}


//Cross over with two numbers 
function crossover(part1,part2)
{
	var newNumber=""; 
	var len = part1.number.length; 
	
	for(var i = 0;i<len;i++) 
	{ 		
	
		var pp = random_num(0, 100)/100; 
	
		if(pp<CROSSOVER_LEFT_PROBABILITY)
		{
			if(!newNumber.includes(part1.number[i]) && !checkFirstDigitIsZero(newNumber,part1.number[i]))
				newNumber += part1.number[i]; 
			else
				i--;
		}
		else if(pp<CROSSOVER_RIHT_PROBABILITY) 
		{
			if(!newNumber.includes(part2.number[i]) && !checkFirstDigitIsZero(newNumber,part2.number[i]))
				newNumber += part2.number[i]; 	
			else
				i--;
		}
		else
		{
			var gene = mutated_genes();
			if(!newNumber.includes(gene) && !checkFirstDigitIsZero(newNumber,gene))
				newNumber += gene; 
			else
				i--;	
		}
			
	}
	return newNumber;
}

// Create random number for mutation 
function mutate(number,len)
{
	var newNumber=""; 

	for(var i = 0;i<len;i++) 
	{ 
		var gene = mutated_genes();
		if(!newNumber.includes(gene) && !checkFirstDigitIsZero(newNumber,gene))
			newNumber += gene; 
		else
			i--;	
	}

	return newNumber;
}

//Permutate between selected two random digit
function permutate(number,len)
{	
	var save_number = number;

	for(var i = 0;i<len;i++) 
	{ 
		var random_num_a = random_num(0, len-1);
		var random_num_b = random_num(0, len-1);
		
		var save_num_a = number[random_num_a];
		
		number = number.replaceAt(random_num_a,number[random_num_b]);
		number = number.replaceAt(random_num_b,save_num_a);
			
		if(checkFirstDigitIsZero1(number))
		{
			number = save_number; 
			i--;	
		}
	}
	return number;
}

	//Check first new digit is zero for given number
function checkFirstDigitIsZero(guessNumber,newValue)
{
	if(guessNumber.length === 0 && newValue ===0)
		return true;
	return false;
}

//Check first digit is zero in given number
function checkFirstDigitIsZero1(guessNumber)
{
	if(guessNumber[0] ===0)
		return true;
	return false;
}

//Function to generate random numbers in given range  
function random_num(start, end) 
{ 
	var range = end - start + 1; 
	var random_int = start + Math.floor(Math.random() * range);
	return random_int; 
} 

//Create random genes for mutation 
function mutated_genes() 
{
	var len = GENES.length; 
	var r = random_num(0, len-1); 
	return GENES[r]; 
} 

//Calculate fittness score
function cal_fitness(number) 
{
	var len = population.length; 
	var fitness = 0; 
	for(var i = 0;i<len;i++) 
	{ 
		if(number.number!==population[i].number)
		{
			var sumValue1 = number.p + number.n;
			var sumValue2 = population[i].p + population[i].n;
			
			if(sumValue1 <= sumValue2) 
			{
				fitness++; 
			
				if(number.p<population[i].p)
					fitness++;
					
					
				if(number.p<population[i].p && number.n<population[i].n)
					fitness++;	
				
				if(number.p<population[i].p && number.n>population[i].n)
					fitness++;	

			}

			if(sumValue1 === sumValue2 && number.p<population[i].p) 
				fitness++; 
		}

	} 
	return fitness;     
};	


String.prototype.replaceAt=function(index, replacement) {
	return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

