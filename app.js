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

itemsView = new View({x:105, y:1025, width:250, height:88,
						superView:PSD['iphone']
					});
itemsView.html = "Checkout Now"
itemsView.style = {
    "color": "white",
    "font": "30px 'Open Sans', Arial",
	"border" : "1px solid white",
	"border-radius": "8px",
	"text-align": "center",
	"line-height": "86px"
}
itemsView.visible = false;

PSD['addCart'].style.cursor = "pointer"
PSD['cart'].style.cursor = "pointer"
PSD['shoppingCart'].style.cursor = "pointer"
PSD['green'].style.cursor = "pointer"
buyView.style.cursor = "pointer"
itemsView.style.cursor = "pointer"
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
	cartMe(PSD['cart']);
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
		origin: "7% 0%",
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
cartMe = function(view){
	
	// Squeeze item into cart
	animateItem = new Animation({
		view: PSD['item'],
		properties:{
			x:0, y:1100,
			opacity: 0,
			scale: 0.1,
			rotationZ: 40,
			rotationY: 40
		},
		origin: "7% -15%",
		time: 400,
		curve: "ease-in"
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
		resetItem.start();
	})
	
	// Reset Item Image
	resetItem =  new Animation({
		view: PSD['item'],
		properties:{
			x:0, y:129,
			scale: 1,
			rotationZ: 0,
			rotationY: 0
		},
		time: 0
	})
	
	resetItem.on("end", function() {
		PSD['item'].animate({
			properties:{opacity: 1}
		})
	})
}

fadeMe = function(view){
	view.animate({
		properties:{opacity: 0},
		curve: 'ease-out',
		time: 100
	})
}

showMe = function(view){
	view.animate({
		properties:{opacity: 1},
		curve: 'ease-in',
		time: 100
	})
}

fadeRight = function(view){
	view.animate({			
		properties:{
			x:640, opacity: 0
		},
		curve: 'ease-out',
		time: 100
	})
}

addNum = function(view){
	
	// Update cart item count
	view.scale = 0.7
	view.animate({
		properties:{scale:1.0},
		curve:  animationCurve,
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
	
	// Hide Green Buttons, Show Items in Cart
	if (count == 2) {
		utils.delay(200, function() {
			fadeRight(PSD['green']);
			fadeRight(buyView);
			PSD['addCart'].animate({			
				properties: {x:370},
				curve: "spring(600,40,1000)",
				time: 150
			})
			itemsView.visible = true;
		})
		
		// Activate "Checkout" Button
		itemsView.on(Events.TouchStart, function () {
			showCart.start();
			fadeDeal.start();
		})
	}
}