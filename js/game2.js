

var playerID;
var player;
var pallet;
var otherPlayers = {};
var allPallet ={};

function loadGame() {
	// load the environment
	loadEnvironment();
	// load the player
	//initMainPlayer();
	initMainPlayer();
	//
	listenToOtherPlayers();

	window.onunload = function() {
		fbRef.child( "Players/" + playerID ).remove();
	};

	window.onbeforeunload = function() {
		fbRef.child( "Players/" + playerID ).remove();
	};
}

function getRandomColor() {
  var length = 3;
  var chars = '0123456789ABCDEF';
  var hex = '0x';
  while(length--) { hex += chars[(Math.random() * 16) | 0];hex=hex+"0";}
  return hex;
}

function listenToPlayer( playerData ) {

	if ( playerData.val() ) {
		otherPlayers[playerData.key].setOrientation( playerData.val().orientation.position, playerData.val().orientation.rotation );
	}
}

function listenToOtherPlayers(){

	fbRef.child( "Players" ).on( "child_added", function( playerData ) {
		if ( playerData.val() ) {
			if ( playerID != playerData.key && !otherPlayers[playerData.key] ) {
				otherPlayers[playerData.key] = new Player( playerData.key );
				otherPlayers[playerData.key].init();
				fbRef.child( "Players/" + playerData.key ).on( "value", listenToPlayer );
			}
		}
	});

	// when a player is removed, do something

	fbRef.child( "Players" ).on( "child_removed", function( playerData ) {
		if ( playerData.val() ) {
			console.log("++++++++++++++"+ playerData.key+"-------");
			fbRef.child( "Players/" + playerData.key ).off( "value", listenToPlayer );
			scene.remove( otherPlayers[playerData.key].mesh );
			delete otherPlayers[playerData.key];
		}
	});
	/*
	fbRef.child( "Players").on( "child_added", function( playerData ) {
		if ( false	) {
			console.log("------------"+playerData.val);
			if ( true) {
				otherPlayers["2"] = new Player( "2" );
				otherPlayers["2"].init();

				fbRef.child( "Players/" +'2').on( "value", listenToPlayer );
			}
		}
	});
	//when a player is removed, do something
	fbRef.child( "Players" ).on( "child_removed", function( playerData ) {
		if ( playerData.val() ) {
			fbRef.child( "Players/" + playerData.key ).off( "value", listenToPlayer );
			scene.remove( otherPlayers[playerData.key].mesh );
			delete otherPlayers[playerData.key];
		}
	});*/
}

function initMainPlayer() {
	
	playerID=Math.random().toString(36).substr(2, 9);
	fbRef.child( "Players/" + playerID ).set({
		isOnline: true,
		orientation: {
			position: {x: 0, y:0, z:0},
			rotation: {x: -5, y:5, z:5}
		}
	});

	player = new Player( playerID );
	player.isMainPlayer = true;
	player.init();
	camera.position.set(100,80,100);
}


function loadEnvironment() {
    var boolean_pallets=false;
		
				// controls
                var animationGroup = new THREE.AnimationObjectGroup();
				// world
				//palet büyüklükleri
                var geometrypal = new THREE.BoxBufferGeometry( 4, 0.5, 5 );
				//palet material
				var materialpal = new THREE.MeshLambertMaterial( { color: 0xC79C0A,transparent:true} );
				//ray büyüklükleri
				var geometryray = new THREE.BoxBufferGeometry( 0.5, 1, 8 );
				//ray material
				var materialray = new THREE.MeshLambertMaterial( { color: 0xF5F5DC ,transparent:true  } );
				//taban büyüklükleri
				var geometry2= new THREE.BoxBufferGeometry( 30*8, 3, 192 );
				//taban material
				var material2 = new THREE.MeshLambertMaterial( { color: 0x000001,transparent:true } );
				//yol büyüklükleri
				var geometryyol= new THREE.BoxBufferGeometry( 30*8, 2, 224 );
				//yol material
				var materialyol = new THREE.MeshLambertMaterial( { color: 0x2c2033,transparent:true } );
				//direk büyüklükleri
				var geometrydir = new THREE.BoxBufferGeometry( 0.2,8, 0.5 );
				//direk material
				var materialdir = new THREE.MeshLambertMaterial( { color: 0x2a80a3  ,transparent:true} );
				//duvar büyüklükleri
				var geometryduv= new THREE.BoxBufferGeometry( 2, 40, 28*8 );
				//duvar material
				var materialduv = new THREE.MeshLambertMaterial( { color: 0x4ffe6ff,transparent:true } );
				for(var k = 0 ; k<5;k++)
				{
					for ( var i = 0; i < 26; i ++ ) {

						for ( var j = 0; j < 24; j ++ ) {

							
									var meshray = new THREE.Mesh( geometryray, materialray );
									meshray.position.x = 14 - ( 8 * i );
									meshray.position.y = k*8-3;
									meshray.position.z = 15 - ( 8* j );
									scene.add( meshray );
									animationGroup.add( meshray );

									var meshray2 = new THREE.Mesh( geometryray, materialray );
									meshray2.position.x = 18 - ( 8 * i );
									meshray2.position.y = k*8-3;
									meshray2.position.z = 15 - ( 8* j );
									scene.add( meshray2 );
									animationGroup.add( meshray2 );

									var meshraydir = new THREE.Mesh( geometrydir,materialdir  );
									meshraydir.position.x = 19 - ( 8 * i );
									meshraydir.position.y = k*8;
									meshraydir.position.z = 19 - ( 8* j );
									scene.add( meshraydir );
									animationGroup.add( meshraydir );

									var meshraydir1 = new THREE.Mesh( geometrydir,materialdir  );
									meshraydir1.position.x = 19 - ( 8 * i )-5.5;
									meshraydir1.position.y = k*8;
									meshraydir1.position.z = 19 - ( 8* j );
									scene.add( meshraydir1 );
									animationGroup.add( meshraydir1 );
								

							
							if( i==0&j==0&k==0 )
							{
									var mesh2 = new THREE.Mesh( geometry2, material2 );
									mesh2.position.x =-85;
									mesh2.position.y =-5;
									mesh2.position.z = -77;
									scene.add( mesh2 );
									animationGroup.add( mesh2 );

									var meshyol = new THREE.Mesh( geometryyol, materialyol );
									meshyol.position.x =-85;
									meshyol.position.y =-5;
									meshyol.position.z = -77;
									scene.add( meshyol );
									animationGroup.add( meshyol );

									
									var meshduv = new THREE.Mesh( geometryduv, materialduv );
									meshduv.position.x =-205;
									meshduv.position.y =15;
									meshduv.position.z = -77	;
									meshduv.material.opacity = 0.4;
									scene.add( meshduv );
							}
						
						if( boolean_pallets==false	)
								{ 
									//paletlerin unique color larını tutacak 2d array
									var PalletColor =new Array();
									var counter = 0;
										
									for (var k = 3120; k >= 0; k--) {
									try {
										var tempColor=getRandomColor();
										//kutu büyüklükleri
										var geometry = new THREE.BoxBufferGeometry( 5, 5, 5 );
										//kutu materialdir
										var material = new THREE.MeshLambertMaterial( { color:	0xFF0000} );	

										var ref= firebase.database().ref("Pallets/"+k.toString());
										ref.on("value", function(snapshot) {
										var a=snapshot.val().Lo;
										var x=a.slice(0,2);
										var y=a.slice(3,5);
										var z=a.slice(6,8);
										var ExpDate=snapshot.val().ExpDate;
										

										var mesh= new THREE.Mesh( geometry, material );
										mesh.position.x = 16 - ( 8 * y );
										mesh.position.y = x*8;
										mesh.position.z = 16 - ( 8* z );
										scene.add( mesh );
										animationGroup.add( mesh);
											//palet
										var meshpal = new THREE.Mesh( geometrypal, materialpal );
										meshpal.position.x = 16 - ( 8 * y );
										meshpal.position.y = x*8 -2.5;
										meshpal.position.z = 16 - ( 8* z );
										if (true) 
											{
												PalletColor[colorCount]=new Array(ExpDate,tempColor);
												
												mesh.MeshLambertMaterial.color.setHex(tempColor);
											}
										counter=counter+1;
										scene.add( meshpal );
										animationGroup.add( meshpal );
										raycaster = new THREE.Raycaster();
											
									    }, function (error) {
										console.log("Error: " + error.code);
										
									    });
									}
									catch(err) {

										console.log(err.message+"/////////////////////");
										continue;
									}
										

									}
									
									 boolean_pallets=true ;
									
								}
									
							}
					}
				}

				
				
				// lights
                    
                    var light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
					scene.add( light );
				//
			
         
			
}