// Setup
var count = 1
countView = new View({x:64, y:1042, width:50, height:50});
countView.html = count
countView.style = {
    "color": "white",
    "font": "20px 'Open Sans', Arial",
}

buyView = new View({x:425, y:1045, width:220, height:60});
buyView.html = "Buy Now"
buyView.style = {
    "color": "white",
    "font": "34px 'Open Sans', Arial",
	"font-weight": "600"
}

PSD['addCart'].style.cursor = "pointer"
PSD['cart'].style.cursor = "pointer"
PSD['shoppingCart'].style.cursor = "pointer"
PSD['green'].style.cursor = "pointer"
buyView.style.cursor = "pointer"
PSD['shoppingCart'].style.zIndex = 1

// Initially hide shopping cart modal off screen
PSD['shoppingCart'].animate({
	properties:{
		x:0, y:1136, opacity: 0
	},
	time: 0
})

animationCurve = "spring(600,40,500)"

PSD['addCart'].on(Events.TouchStart, function () {
	bounceMe(PSD['cart']);
})

// Show Cart Modal
PSD['cart'].on(Events.TouchStart, function () {
	showCart.start();
	fadeDeal.start();
})

showCart =  new Animation({
	view: PSD['shoppingCart'],
	properties:{
		x:0, y:0, opacity: 1,
		rotationX: 0,
      	scale: 1
	},
	time: 300,
	curve: 'ease-out'
})

fadeDeal = new Animation({
	view: PSD['iphone'],
	properties:{
      	scale: 0.8,
		opacity: 0.5
	},
	time: 200,
	curve: 'ease-out'
})

// Hide Cart Modal
PSD['shoppingCart'].on(Events.TouchStart, function () {
	PSD['shoppingCart'].animate({
		properties:{
			x:100, y:1136, opacity: 0,
			rotationX: -10,
	      	scale: 0.7
		},
		time: 300,
		curve: 'ease-in'
	})
	PSD['iphone'].animate({
		properties:{
	      	scale: 1,
			opacity: 1
		},
		time: 200,
		curve: 'ease-in'
	})
})

// Functions
bounceMe = function(view){
	
	// Squeeze item into cart
	animateItem =  new Animation({
		view: PSD['item'],
		properties:{
			x:0, y:1100,
			opacity: 0,
			scale: 0.1,
			rotationZ: 40,
			rotationY: 40
		},
		origin: "7% -15%",
		time: 500,
		curve: "ease-out"
	})
	animateItem.start();
	
	// Bounce Icon
	animateItem.on("end", function() {
		view.scale = 0.7
		view.animate({
			properties:{scale:1.0},
			curve: animationCurve
		})
		addNum(countView);
	})
}

fadeMe = function(view){
	view.animate({
		properties:{
			opacity: 0,
			curve: 'ease-out'
		},
		time: 100
	})
}

showMe = function(view){
	view.animate({
		properties:{
			opacity: 1,
			curve: 'ease-in'
		},
		time: 100
	})
}

addNum = function(view){
	
	// Update cart item count
	view.scale = 0.7
	view.animate({
		properties:{scale:1.0},
		curve:  "spring(600,40,500)",
		origin: "0% 50%"
	})
	
	count ++
	if (count > 9) {
		countView.style = {
		    "font": "15px 'Open Sans'",
			"margin": "3px 0 0 -3px"
		}
	}
	countView.html = count
	
	// Switch Green Buttons
	if (count == 2) {
		
		PSD['green'].animate({			
			properties:{
				x:375, y:1136, opacity: 0,
				curve: 'ease-out'
			},
			time: 150
		})
		fadeMe(buyView);
		
		// Wait a few, then bring back button
		utils.delay(200, function() {
			animateButton = PSD['green'].animate({			
				properties:{
					x:375, y:1025, opacity: 1,
					curve: 'ease-in'
				},
				time: 100
			})
			
			animateButton.on("end", function() {
				buyView.html = "View Cart"
				showMe(PSD['green']);
				showMe(buyView);
			})
		})
		
		// Activate "View Cart" Button
		PSD['green'].on(Events.TouchStart, function () {
			showCart.start();
			fadeDeal.start();
		})
		buyView.on(Events.TouchStart, function () {
			showCart.start();
			fadeDeal.start();
		})
	}
}