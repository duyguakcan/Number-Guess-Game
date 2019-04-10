var PersonGuessNumber = function(number, guessNumber) {
	
	//Target number
	this.number = number;
	//Guess number
	this.guessNumber = guessNumber;
	

	this.checkNumbers = function()
	{
		var result = this.compareNumbers();
		return result;
	};

	//Compare numbers and get results
	this.compareNumbers = function()
	{
		var result = {};
		var pNum = 0;
		var nNum = 0;
		var foundNumbers = [];
		var howManyUseNumbers = [];

		if(this.number == this.guessNumber)
			pNum = 4;
		else
		{
			for(var i = 0;i<this.number.length;i++)
			{
				var numberObject = this.search(this.guessNumber[i],howManyUseNumbers);
				if(numberObject == null)
				{
					var count = this.char_count(this.number, this.guessNumber[i]);
					var singleObj = {}
					singleObj['num'] = this.guessNumber[i];
					singleObj['count'] = count;
					singleObj['remainCount'] = count;
					howManyUseNumbers.push(singleObj);
				}
				if(this.number.includes(this.guessNumber[i]))
				{
					var numObj = {
							num:this.guessNumber[i],
							objValue: -1
							};
					if(this.number[i] === this.guessNumber[i])
					{
						numObj.objValue = 1;
					}
					
					foundNumbers.push(numObj);
				}
			}
		

			for(var i = 0;i<foundNumbers.length;i++)
			{
				var numberObject = this.search(foundNumbers[i]['num'],howManyUseNumbers);
				if(foundNumbers[i]['objValue'] ===1)
				{
					numberObject['remainCount'] = numberObject['remainCount']-1;
					pNum +=1;
				}
			}
			
			for(var i = 0;i<foundNumbers.length;i++)
			{
				var numberObject = this.search(foundNumbers[i]['num'],howManyUseNumbers);
				if(foundNumbers[i]['objValue'] ===-1 && numberObject['remainCount']>0)
				{
					numberObject['remainCount'] = numberObject['remainCount']-1;
					nNum -=1;
				}
			}

		}
		result['positive'] = pNum;
		result['negative'] = nNum;
		
		return result;
	};
	
	//Find how many the selected digit use within the number.
	this.char_count = function(str, letter) 
	{
	 var letter_Count = 0;
	 for (var position = 0; position < str.length; position++) 
	 {
		if (str.charAt(position) == letter) 
		  {
			letter_Count += 1;
		  }
	  }
	  return letter_Count;
	}
	
	//Find an item from array
	this.search = function(nameKey, myArray){
		for (var i=0; i < myArray.length; i++) {
			if (myArray[i].num === nameKey) {
				return myArray[i];
			}
		}
	}
	
};

