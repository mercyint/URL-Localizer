jQuery(document).ready(function($) {
								
var styledMapType = new google.maps.StyledMapType([ { stylers: [ { visibility: "off" }, {}, { lightness: -100 }, {}, {} ] } ], {
        name: "black"
    });
var SBANtheme = TimeMapTheme.create("grey", {eventColor:"#CCC", icon: "/tpt/slavery-by-another-name/media/maps/images/arrow.png", iconShadow: "/tpt/slavery-by-another-name/media/maps/images/arrow_shadow.png", eventIcon: "/tpt/slavery-by-another-name/media/maps/images/red-circle.png", fillColor: "#000", fillOpacity: "0.60", eventTextColor: "#000"});
var SBANtheme_invisible = TimeMapTheme.create("grey", {eventColor:"#CCC", icon: "/tpt/slavery-by-another-name/media/maps/images/clear.png", iconShadow: "/tpt/slavery-by-another-name/media/maps/images/clear.png", eventIcon: "/tpt/slavery-by-another-name/media/maps/images/red-circle.png", fillColor: "#000", fillOpacity: "0.60", eventTextColor: "#000"});
var tm;	
var LatLng = new mxn.LatLonPoint(39.00950955260123, -96.15234375);
tm = TimeMap.init({
				  		  
			  
        mapId: "map",               // Id of map div element (required)
        timelineId: "timeline",     // Id of timeline div element (required)
		scrollTo: "1863-01-01",
        options: {
            mapType:"physical",
			centerOnItems: false,
			mapCenter: new mxn.LatLonPoint(39.00950955260123, -96.15234375),
			mapZoom: 4,
			showMapTypeCtrl: false,
			showMapCtrl: false,
			theme: SBANtheme

        },
        datasets: [
            {
                id: "start",
                title: "start",
                // note that the lines below are now the preferred syntax
                type: "basic",
				stylers: [ { visibility: "off" } ],
				
                options: { 
				
                    items: [
							{overlay : {
                                north: 50.33050147340383,
                                south: 25.541120106605288,
                                east: -66.533203125,
                                west: -124.716796875,
                                image: "/tpt/slavery-by-another-name/media/maps/images/1890-and-1900.png"
                            }},
							
							{start : "1860", end : "1869",
							 point : { lat : 32.803282, lon : -96.778564 },
                             title : "Life in the 1860s ", 
							   options : {
							   theme: SBANtheme_invisible,
							   description:"",
							   openInfoWindow: function() { 
								var boxText = "<div style='margin-top: 8px;'>The Civil War dominated all aspects of American life in the 1860s. During Reconstruction in the years that followed, the federal government occupied Southern states and maintained control of their governments. In order to be re-admitted to the Union, Confederate states were required to adapt new constitutions that abolished slavery. Southern blacks entered politics and began to found educational institutions such as Howard University. Meanwhile, across the nation, an enormous railroad boom stretched the frontier farther to the west, connecting the two coasts with the first transcontinental railroad in 1869. Population grew in the Midwest and West, and in 1867, Nebraska was admitted to the Union. In the Plains, conflicts between settlers and American Indians escalated into warfare.</div>";
								var description = this.opts.description;
								var marker = this.getNativePlacemark(); // in timemap.js 1.x: this.placemark
								var map = this.map.getMap();
								var myOptions = {
								content: boxText
								,disableAutoPan: false
								,alignBottom: true
								,maxWidth: 0
								,pixelOffset: new google.maps.Size(-400,0)
								,zIndex: null
								,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"}
    							
   								,closeBoxURL: "close.gif"
    							,infoBoxClearance: new google.maps.Size(1, 1)
    							,isHidden: false
    							,pane: "floatPane"
 								};
								
								var ib = new InfoBox(myOptions);
								ib.open(map, marker, myOptions);
							   }}},
							   
							   {start : "1861", end : "1865",
							 point : { lat : 32.803282, lon : -96.778564 },
                             title : "The Civil War", 
							   options : {
							   theme: SBANtheme_invisible,
							   description:"",
							   openInfoWindow: function() { 
								var boxText = "<div style='margin-top: 8px;'>The Civil War caused the deaths of 620,000 American soldiers, and the destruction of the South's economy, culture, and major transportation systems. Though initially waged over the South's wish to secede from the union, Lincoln Emancipation Proclamation of 1863 added the moral authority of the abolition of slavery to the North's cause. </div>";
								var description = this.opts.description;
								var marker = this.getNativePlacemark(); // in timemap.js 1.x: this.placemark
								var map = this.map.getMap();
								var myOptions = {
								content: boxText
								,disableAutoPan: false
								,alignBottom: true
								,maxWidth: 0
								,pixelOffset: new google.maps.Size(-400,0)
								,zIndex: null
								,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"}
    							
   								,closeBoxURL: "close.gif"
    							,infoBoxClearance: new google.maps.Size(1, 1)
    							,isHidden: false
    							,pane: "floatPane"
 								};
								var ib = new InfoBox(myOptions);
								ib.open(map, marker, myOptions);
							   }}},
							
							
									   {start : "1865",
							 point : { lat : 32.803282, lon : -96.778564 },
                             title : "Black Codes Enacted", 
							   options : {
							   theme: SBANtheme_invisible,
							   description:"",
							   openInfoWindow: function() { 
								var boxText = "<div><iframe id='partnerPlayer' frameborder='0' marginwidth='0' marginheight='0' scrolling='no' style='width:256px; height:144px; margin-left: 5px' src='http://video.pbs.org/widget/partnerplayer/2176600288/?w=256&amp;h=144&amp;chapterbar=False&amp;autoplay=False' align='right'></iframe>Immediately after the Civil War ended, the white politicians of Southern states enacted \"Black Codes\" that allowed African Americans certain rights, such as legalized marriage, ownership of property, and limited access to the courts, but denied them the rights to testify against whites, to serve on juries or in state militias, or to vote. And, in response to planters' demands that the freed people be required to work on the plantations, the Black Codes declared that those who failed to sign yearly labor contracts could be arrested and hired out to white landowners. Some states limited the occupations open to African Americans and barred them from acquiring land, and others provided that judges could assign African American children to work for their former owners without the consent of their parents. These Codes were all repealed in 1866, after the election put Republicans in control in the South.</div>";
								var description = this.opts.description;
								var marker = this.getNativePlacemark(); // in timemap.js 1.x: this.placemark
								var map = this.map.getMap();
								var myOptions = {
								content: boxText
								,disableAutoPan: false
								,alignBottom: true
								,maxWidth: 0
								,pixelOffset: new google.maps.Size(-400,0)
								,zIndex: null
								,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"}
    							
   								,closeBoxURL: "close.gif"
    							,infoBoxClearance: new google.maps.Size(1, 1)
    							,isHidden: false
    							,pane: "floatPane"
 								};
								var ib = new InfoBox(myOptions);
								ib.open(map, marker, myOptions);
							   }}},
							

							  {start : "1865",end : "1877",
							point : { lat : 32.803282, lon : -96.778564 },
                             title : "Reconstruction", 
							   options : {
							   theme: SBANtheme_invisible,
							   description:"",
							   openInfoWindow: function() { 
								var boxText = "<div> <iframe id='partnerPlayer' frameborder='0' marginwidth='0' marginheight='0' scrolling='no' style='width:256px; height:144px; margin-left: 5px' src='http://video.pbs.org/widget/partnerplayer/2179593589/?w=256&amp;h=144&amp;chapterbar=False&amp;autoplay=False' align='right'></iframe> During Reconstruction, the federal government struggled to recreate and stabilize the economy, society, and government in the South, while supporting black civil rights and preventing white supremacists or previous Confederate leaders from gaining power. The federal government created social, political, and economic support for black southerners through federal legislation and local enforcement. But popular support began to wane as Northern citizens grew critical of the expense, length, and corruption of Reconstruction efforts. In 1877, the remaining federal troops were withdrawn and White Southerners reclaimed power.    </div>";
								var description = this.opts.description;
								var marker = this.getNativePlacemark(); // in timemap.js 1.x: this.placemark
								var map = this.map.getMap();
								var myOptions = {
								content: boxText
								,disableAutoPan: false
								,alignBottom: true
								,maxWidth: 0
								,pixelOffset: new google.maps.Size(-400,0)
								,zIndex: null
								,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"}
    							
   								,closeBoxURL: "close.gif"
    							,infoBoxClearance: new google.maps.Size(1, 1)
    							,isHidden: false
    							,pane: "floatPane"
 								};
								var ib = new InfoBox(myOptions);
								ib.open(map, marker, myOptions);
							   }}},
							   
							   
							
							  {start : "1865",
							 point : { lat : 32.803282, lon : -96.778564 },
                             title : "13th Amendment", 
							   options : {
							   theme: SBANtheme_invisible,
							   description:"",
							   openInfoWindow: function() { 
								var boxText = "<div id='contentleft'>The Thirteenth Amendment to the United States Constitution abolished slavery and involuntary servitude, except as punishment for crime. Through the Emancipation Proclamation issued in 1863, Lincoln had claimed the power to free all slaves in the ten Southern states that were in rebellion. However, the proclamation did not apply to slaves held in Union states or in Confederate areas under Union control. The Thirteenth Amendment clarified that slavery was no longer legal in any part of the United States.</div><div id='contentright'><h4>The 13th Ammendment States</h4><ol><li>Neither slavery nor involuntary servitude, except as a punishment for crime whereof the party shall have been duly convicted, shall exist within the United States, or any place subject to their jurisdiction.</li><li>Congress shall have power to enforce this article by appropriate legislation.</li></ol></div>";
								var description = this.opts.description;
								var marker = this.getNativePlacemark(); // in timemap.js 1.x: this.placemark
								var map = this.map.getMap();
								var myOptions = {
								content: boxText
								,disableAutoPan: false
								,alignBottom: true
								,maxWidth: 0
								,pixelOffset: new google.maps.Size(-400,0)
								,zIndex: null
								,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"}
    							
   								,closeBoxURL: "close.gif"
    							,infoBoxClearance: new google.maps.Size(1, 1)
    							,isHidden: false
    							,pane: "floatPane"
 								};
								var ib = new InfoBox(myOptions);
								ib.open(map, marker, myOptions);
							   }}},
							   
							
							
							  {start : "1866",
							 point : { lat : 32.803282, lon : -96.778564 },
                             title : "Civil Rights Act", 
							   options : {
							   theme: SBANtheme_invisible,
							   description:"",
							   openInfoWindow: function() { 
								var boxText = "<div >The Civil Rights Act of 1866 declared that all people born in the United States were citizens, regardless of race, color, or previous condition of slavery. (American Indians were excluded.) It clarified that all citizens had the right to make contracts, to sue and be sued, to be a witness in court, and to inherit or own property. Since its effectiveness was poor and its legality was questioned, Congress passed the Fourteenth Amendment two years later to strengthen and clarify these rights.      </div>";
								var description = this.opts.description;
								var marker = this.getNativePlacemark(); // in timemap.js 1.x: this.placemark
								var map = this.map.getMap();
								var myOptions = {
								content: boxText
								,disableAutoPan: false
								,alignBottom: true
								,maxWidth: 0
								,pixelOffset: new google.maps.Size(-400,0)
								,zIndex: null
								,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"}
    							
   								,closeBoxURL: "close.gif"
    							,infoBoxClearance: new google.maps.Size(1, 1)
    							,isHidden: false
    							,pane: "floatPane"
 								};
								var ib = new InfoBox(myOptions);
								ib.open(map, marker, myOptions);
							   }}},
							   
							   
							
							 {start : "1866",end : "1871",
								 point : { lat : 35.199802000000, lon : -87.03084100000 },
	                             title : "First Ku Klux Klan", 
								   options : {
								   theme: SBANtheme,
								   description:"",
								   openInfoWindow: function() { 
									var boxText = "<div><iframe id='partnerPlayer' frameborder='0' marginwidth='0' marginheight='0' scrolling='no' style='width:256px; height:144px; margin-left: 5px' src='http://video.pbs.org/widget/partnerplayer/2180965244/?w=256&amp;h=144&amp;chapterbar=False&amp;autoplay=False' align='right'></iframe>Confederate veterans formed the Ku Klux Klan in Pulaski, Tennessee, to promote white supremacy by terrorizing and murdering blacks and their allies. The KKK spread throughout the South, until the federal government passed the Enforcement Acts of 1870 and 1871, which were aimed at prosecuting Klan crimes. With the end of Reconstruction and the creation of formal systems of black oppression, white supremacists no longer needed secret societies to promote their ideas, and the groups disbanded for the time being.  </div>";
									var description = this.opts.description;
									var marker = this.getNativePlacemark(); // in timemap.js 1.x: this.placemark
									var map = this.map.getMap();
									var myOptions = {
									content: boxText
									,disableAutoPan: false
									,alignBottom: true
									,maxWidth: 0
									,pixelOffset: new google.maps.Size(-400,0)
									,zIndex: null
									,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"}
	    							
	   								,closeBoxURL: "close.gif"
	    							,infoBoxClearance: new google.maps.Size(1, 1)
	    							,isHidden: false
	    							,pane: "floatPane"
	 								};
									var ib = new InfoBox(myOptions);
									ib.open(map, marker, myOptions);
								   }}},
								   
							
							 {start : "1866",
								 point : { lat : 32.803282, lon : -96.778564 },
	                             title : "Convict Leasing Begins", 
								   options : {
								   theme: SBANtheme_invisible,
								   description:"",
								   openInfoWindow: function() { 
									var boxText = "<div><iframe id='partnerPlayer' frameborder='0' marginwidth='0' marginheight='0' scrolling='no' style='width:256px; height:144px; margin-left: 5px' src='http://video.pbs.org/widget/partnerplayer/2178305185/?w=256&amp;h=144&amp;chapterbar=False&amp;autoplay=False' align='right'></iframe>In 1866, Alabama's first convict lease was for 374 state prisoners to a railroad company for a total of $5.[1] Texas' first agreement this year was for 250 convicts to two railroad companies for $12.50 a month.[2]  Louisiana began in 1866 by leasing out forty-five men for fifty cents a day. Arkansas began leasing convicts in 1867, though for the first six years it paid its lessees thirty-five cents per convict per day. In 1868, Georgia's first convict lease was for 100 convicts for $2,500 to a railroad company.[3] Mississippi's first lease in 1868 was for 241 prisoners to a cotton plantation.[4] Florida's first lease is for 100 prisoners in 1869.[5]      [1]SBAN, p. 54.  [2]ODGA, p. 169.   [3]SBAN, p. 54.  [4]SBAN, p. 55.   [5]SBAN, p. 55. </div><div id='contentright'><h4>The 13th Ammendment States</h4><ol><li>Neither slavery nor involuntary servitude, except as a punishment for crime whereof the party shall have been duly convicted, shall exist within the United States, or any place subject to their jurisdiction.</li><li>Congress shall have power to enforce this article by appropriate legislation.</li></ol></div>";
									var description = this.opts.description;
									var marker = this.getNativePlacemark(); // in timemap.js 1.x: this.placemark
									var map = this.map.getMap();
									var myOptions = {
									content: boxText
									,disableAutoPan: false
									,alignBottom: true
									,maxWidth: 0
									,pixelOffset: new google.maps.Size(-400,0)
									,zIndex: null
									,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"}
	    							
	   								,closeBoxURL: "close.gif"
	    							,infoBoxClearance: new google.maps.Size(1, 1)
	    							,isHidden: false
	    							,pane: "floatPane"
	 								};
									var ib = new InfoBox(myOptions);
									ib.open(map, marker, myOptions);
								   }}},
								   
							
						
							
							 {start : "1868",
								 point : { lat : 32.803282, lon : -96.778564 },
	                             title : "14th Amendment", 
								   options : {
								   theme: SBANtheme_invisible,
								   description:"",
								   openInfoWindow: function() { 
									var boxText = "<div id='contentleft'>The Fourteenth Amendment of the Constitution further solidified the civil rights that blacks had been granted through the Civil Rights Act of 1866. The Amendment defined citizenship, and also contained the privileges or immunity clause, the due process clause, and the equal protection clause. Additional clauses also dealt with Confederate debt and the status of ex-confederate leaders.</div><div id='contentright'><h4>The 14th Ammendment States</h4></div>";
									var description = this.opts.description;
									var marker = this.getNativePlacemark(); // in timemap.js 1.x: this.placemark
									var map = this.map.getMap();
									var myOptions = {
									content: boxText
									,disableAutoPan: false
									,alignBottom: true
									,maxWidth: 0
									,pixelOffset: new google.maps.Size(-400,0)
									,zIndex: null
									,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"}
	    							
	   								,closeBoxURL: "close.gif"
	    							,infoBoxClearance: new google.maps.Size(1, 1)
	    							,isHidden: false
	    							,pane: "floatPane"
	 								};
									var ib = new InfoBox(myOptions);
									ib.open(map, marker, myOptions);
								   }}},
								   
	
							
							 {start : "1870", end : "1879",
								 point : { lat : 32.803282, lon : -96.778564 },
	                             title : "Life in the 1870s", 
								   options : {
								   theme: SBANtheme_invisible,
								   description:"",
								   openInfoWindow: function() { 
									var boxText = "<div>During the 1870s, the South continued to attempt to recover from the Civil War. Economically fragile, the South struggled to find revenue to pay for public education, bridge and road repair, and prisons. New taxes angered white planters and fed anger against the federal government, Republicans, and blacks. The Panic of 1873 disrupted the economy again for the next six years, stopping railroad growth, and brought cotton to half its value. In the North, patience with Reconstruction expenses and efforts was growing thin. President Grant appeared to lose interest in protecting blacks in the South, and corruption brought additional criticism. In the South, blacks began to lose political power as the federal government pulled out. In 1877, in response to Southern support for his election, President Hayes recalled federal troops from Southern states, ending Reconstruction. In 1876, Colorado became a state.</div>";
									var description = this.opts.description;
									var marker = this.getNativePlacemark(); // in timemap.js 1.x: this.placemark
									var map = this.map.getMap();
									var myOptions = {
									content: boxText
									,disableAutoPan: false
									,alignBottom: true
									,maxWidth: 0
									,pixelOffset: new google.maps.Size(-400,0)
									,zIndex: null
									,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"}
	    							
	   								,closeBoxURL: "close.gif"
	    							,infoBoxClearance: new google.maps.Size(1, 1)
	    							,isHidden: false
	    							,pane: "floatPane"
	 								};
									var ib = new InfoBox(myOptions);
									ib.open(map, marker, myOptions);
								   }}},
								   
							
							 {start : "1870",
								 point : { lat : 32.803282, lon : -96.778564 },
	                             title : "15th Amendment and Enforcement Acts", 
								   options : {
								   theme: SBANtheme_invisible,
								   description:"",
								   openInfoWindow: function() { 
									var boxText = "<div>The Fifteenth Amendment was the last of the three Reconstruction Amendments. It prohibits the denial or abridgment of suffrage based on race, color, or previous condition of servitude. The Enforcement Acts were a series of laws passed to protect blacks by prohibiting the use of violence to prevent them from voting.</div>";
									var description = this.opts.description;
									var marker = this.getNativePlacemark(); // in timemap.js 1.x: this.placemark
									var map = this.map.getMap();
									var myOptions = {
									content: boxText
									,disableAutoPan: false
									,alignBottom: true
									,maxWidth: 0
									,pixelOffset: new google.maps.Size(-400,0)
									,zIndex: null
									,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"}
	    							
	   								,closeBoxURL: "close.gif"
	    							,infoBoxClearance: new google.maps.Size(1, 1)
	    							,isHidden: false
	    							,pane: "floatPane"
	 								};
									var ib = new InfoBox(myOptions);
									ib.open(map, marker, myOptions);
								   }}},
							
							
							
							 {start : "1871",
								 point : { lat : 32.803282, lon : -96.778564 },
	                             title : "Convict Leasing Expands", 
								   options : {
								   theme: SBANtheme_invisible,
								   description:"",
								   openInfoWindow: function() { 
									var boxText = "<div>Tennessee began leasing convicts in 1871. The first lease was for nearly 800 prisoners to Tennessee Coal, Iron & Railroad Co.[6] North Carolina began leasing convicts in 1872.[7] South Carolina began leasing convicts in 1873.    [6]SBAN, p. 55.   [7]SBAN, p. 55. </div>";
									var description = this.opts.description;
									var marker = this.getNativePlacemark(); // in timemap.js 1.x: this.placemark
									var map = this.map.getMap();
									var myOptions = {
									content: boxText
									,disableAutoPan: false
									,alignBottom: true
									,maxWidth: 0
									,pixelOffset: new google.maps.Size(-400,0)
									,zIndex: null
									,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"}
	    							
	   								,closeBoxURL: "close.gif"
	    							,infoBoxClearance: new google.maps.Size(1, 1)
	    							,isHidden: false
	    							,pane: "floatPane"
	 								};
									var ib = new InfoBox(myOptions);
									ib.open(map, marker, myOptions);
								   }}},
								   
			
							
							{start : "1871",
								 point : { lat : 41.878114000000, lon : -87.62979800000 },
	                             title : "Chicago Fire", 
								   options : {
								   theme: SBANtheme,
								   description:"",
								   openInfoWindow: function() { 
									var boxText = "<div id='contentleft'>A fire sweeps through Chicago, destroying nearly a third of the city over two days. </div><div id='contentright'><img src='images/chicago_fire.jpg' alt='Chicago Fire image' title='Chicago Fire - Harper's Weekly.' /><br/>Image Ownership: Public Domain</div>";
									var description = this.opts.description;
									var marker = this.getNativePlacemark(); // in timemap.js 1.x: this.placemark
									var map = this.map.getMap();
									var myOptions = {
									content: boxText
									,disableAutoPan: false
									,alignBottom: true
									,maxWidth: 0
									,pixelOffset: new google.maps.Size(-400,0)
									,zIndex: null
									,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"}
	    							
	   								,closeBoxURL: "close.gif"
	    							,infoBoxClearance: new google.maps.Size(1, 1)
	    							,isHidden: false
	    							,pane: "floatPane"
	 								};
									var ib = new InfoBox(myOptions);
									ib.open(map, marker, myOptions);
								   }}},
							
							
								
							
							{start : "1873",
								 point : { lat : 30.788528000000, lon : -92.94848700000 },
	                             title : "Colfax Massacre in Louisiana", 
								   options : {
								   theme: SBANtheme,
								   description:"",
								   openInfoWindow: function() { 
									var boxText = "<div>In response to a contested governor's election between Republicans and Democrats in Louisiana, a black militia formed to protect the Republican politicians inside the Colfax courthouse in Grant Parish. Local white Democrats attacked, focusing their violence on the blacks. Three white men and more than one hundred black men were killed, many after surrendering. Though similar episodes had occurred across Louisiana and the South, the scale and savagery of the massacre brought national attention. </div>";
									var description = this.opts.description;
									var marker = this.getNativePlacemark(); // in timemap.js 1.x: this.placemark
									var map = this.map.getMap();
									var myOptions = {
									content: boxText
									,disableAutoPan: false
									,alignBottom: true
									,maxWidth: 0
									,pixelOffset: new google.maps.Size(-400,0)
									,zIndex: null
									,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"}
	    							
	   								,closeBoxURL: "close.gif"
	    							,infoBoxClearance: new google.maps.Size(1, 1)
	    							,isHidden: false
	    							,pane: "floatPane"
	 								};
									var ib = new InfoBox(myOptions);
									ib.open(map, marker, myOptions);
								   }}},
							
							
							
							{start : "1873",end : "1879",
								 point : { lat : 40.714353000000, lon : -74.00597300000 },
	                             title : "Panic of 1873", 
								   options : {
								   theme: SBANtheme,
								   description:"",
								   openInfoWindow: function() { 
									var boxText = "<div>When financier Jay Cooke's investment bank failed in November 1873, it triggered the failures of other banks and the closure of the New York stock market. The crisis swept throughout the economy, severely affecting railroad companies. As unemployment shot up and wages decreased, workers grew increasingly upset and suspicious. A series of strikes against railroads and mines in 1877 were violent, and did not end until federal troops arrived. The economy did not fully recover until 1879. </div>";
									var description = this.opts.description;
									var marker = this.getNativePlacemark(); // in timemap.js 1.x: this.placemark
									var map = this.map.getMap();
									var myOptions = {
									content: boxText
									,disableAutoPan: false
									,alignBottom: true
									,maxWidth: 0
									,pixelOffset: new google.maps.Size(-400,0)
									,zIndex: null
									,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"}
	    							
	   								,closeBoxURL: "close.gif"
	    							,infoBoxClearance: new google.maps.Size(1, 1)
	    							,isHidden: false
	    							,pane: "floatPane"
	 								};
									var ib = new InfoBox(myOptions);
									ib.open(map, marker, myOptions);
								   }}},
							
								   
								   
									{start : "1874", point : { lat : 32.803282, lon : -96.778564 },title : "Southern Paramilitary Groups Arise", options : {theme: SBANtheme_invisible, description:"", openInfoWindow: function(){ var boxText = "<div >In Louisiana, confederate veterans who had taken part in the Colfax Massacre organized the 'White League' in 1874 order to better intimidate Republicans and blacks. In Mississippi, the 'Red Shirts' formed in 1875 for the same purpose. Both groups operated openly, aggressively preventing blacks from voting, then assassinating Republicans who were elected. The White League was eventually absorbed into militia groups, but the Red Shirts remained active until 1899. </div>";var description = this.opts.description; var marker = this.getNativePlacemark();var map = this.map.getMap();var myOptions = {content: boxText,disableAutoPan: false,alignBottom: true,maxWidth: 0,pixelOffset: new google.maps.Size(-400,0),zIndex: null,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"},closeBoxURL: "close.gif",infoBoxClearance: new google.maps.Size(1, 1),isHidden: false,pane: "floatPane"};var ib = new InfoBox(myOptions); ib.open(map, marker, myOptions); }}},
									
									{start : "1875",  point : { lat : 32.803282, lon : -96.778564 },title : "U.S. v. Cruikshank", options : {theme: SBANtheme_invisible, description:"", openInfoWindow: function(){ var boxText = "<div ><iframe id='partnerPlayer' frameborder='0' marginwidth='0' marginheight='0' scrolling='no' style='width:256px; height:144px; margin-left: 5px' src='http://video.pbs.org/widget/partnerplayer/2180965244/?w=256&amp;h=144&amp;chapterbar=False&amp;autoplay=False' align='right'></iframe>The federal government's attempt to prosecute the killers of the Colfax Massacre backfired horribly when the Supreme Court ruled that the Enforcement Act of 1870 applied only to actions committed by the state, not individuals. The ruling encouraged white supremacists to increase their violence and intimidation.  </div>";var description = this.opts.description; var marker = this.getNativePlacemark();var map = this.map.getMap();var myOptions = {content: boxText,disableAutoPan: false,alignBottom: true,maxWidth: 0,pixelOffset: new google.maps.Size(-400,0),zIndex: null,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"},closeBoxURL: "close.gif",infoBoxClearance: new google.maps.Size(1, 1),isHidden: false,pane: "floatPane"};var ib = new InfoBox(myOptions); ib.open(map, marker, myOptions); }}},
									
									{start : "1880",end : "1889",  point : { lat : 32.803282, lon : -96.778564 },title : "Life in the 1880s", options : {theme: SBANtheme_invisible, description:"", openInfoWindow: function(){ var boxText = "<div >The 1880s were an era of rapid industrial, economic, and population growth. During this \"Gilded Age,\" business leaders such as Rockefeller, Mellon, Carnegie, Hill, Flagler, Morgan, Vanderbilt, and Astor grew enormous wealthy from the creation of and investment in industries and transportation. New inventions like electricity, the sewing machine, streetcars, and subways made life easier for the masses. New resources such as oil, and new ideas in engineering and management made factories more efficient and profitable. A huge wave of immigration from Europe supplied cheap labor and filled Northern cities, creating crowding and leading to the development of social welfare organizations such as settlement houses. Westward expansion continued, and North Dakota, South Dakota, Montana, and Washington were admitted as states in 1889. </div>";var description = this.opts.description; var marker = this.getNativePlacemark();var map = this.map.getMap();var myOptions = {content: boxText,disableAutoPan: false,alignBottom: true,maxWidth: 0,pixelOffset: new google.maps.Size(-400,0),zIndex: null,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"},closeBoxURL: "close.gif",infoBoxClearance: new google.maps.Size(1, 1),isHidden: false,pane: "floatPane"};var ib = new InfoBox(myOptions); ib.open(map, marker, myOptions); }}},
									
									{start : "1881",  point : { lat : 32.803282, lon : -96.778564 },title : "Jim Crow Laws ", options : {theme: SBANtheme_invisible, description:"", openInfoWindow: function(){ var boxText = "<div ><iframe id='partnerPlayer' frameborder='0' marginwidth='0' marginheight='0' scrolling='no' style='width:256px; height:144px; margin-left: 5px' src='http://video.pbs.org/widget/partnerplayer/2179612248/?w=256&amp;h=144&amp;chapterbar=False&amp;autoplay=False' align='right'></iframe>When Southern Democrats took power after Reconstruction, they passed a series of local and state laws to oppress blacks and disenfranchise them. Jim Crow laws required segregation in transportation, education, and restaurants, and restrooms. Voting restrictions such as poll taxes, literacy tests, and residency requirements prevented almost all black and some poor whites from voting. Legally segregated, politically hobbled, economically disadvantaged, and violently intimidated, Southern blacks were powerless.   </div>";var description = this.opts.description; var marker = this.getNativePlacemark();var map = this.map.getMap();var myOptions = {content: boxText,disableAutoPan: false,alignBottom: true,maxWidth: 0,pixelOffset: new google.maps.Size(-400,0),zIndex: null,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"},closeBoxURL: "close.gif",infoBoxClearance: new google.maps.Size(1, 1),isHidden: false,pane: "floatPane"};var ib = new InfoBox(myOptions); ib.open(map, marker, myOptions); }}},
									
									{start : "1882", point : { lat : 33.657051000000, lon : -87.11805400000  },title : "Pratt Mines Strike ", options : {theme: SBANtheme, description:"", openInfoWindow: function(){ var boxText = "<div >Free laborers in at the Pratt Mine in Alabama went on strike to protest wage decreases and the presence of convict laborers. The owners, Tennessee Coal, Iron, and Railroad Company, responded by filling all open spots with convict laborers.  [8]SBAN, p. 73. </div>";var description = this.opts.description; var marker = this.getNativePlacemark();var map = this.map.getMap();var myOptions = {content: boxText,disableAutoPan: false,alignBottom: true,maxWidth: 0,pixelOffset: new google.maps.Size(-400,0),zIndex: null,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"},closeBoxURL: "close.gif",infoBoxClearance: new google.maps.Size(1, 1),isHidden: false,pane: "floatPane"};var ib = new InfoBox(myOptions); ib.open(map, marker, myOptions); }}},
									
									{start : "1882", point : { lat : 32.803282, lon : -96.778564 },title : "Chinese Exclusion Act ", options : {theme: SBANtheme_invisible, description:"", openInfoWindow: function(){ var boxText = "<div >Congress passed the Chinese Exclusion Act to prevent skilled and unskilled laborers from China from immigrating, and created difficult travel paperwork burdens for non-labor Chinese. The Act was expanded and extended until 1943. It reflected common anti-Chinese attitudes at the time  especially strong in California  where white Americans felt that Chinese immigrants were depressing wages. </div>";var description = this.opts.description; var marker = this.getNativePlacemark();var map = this.map.getMap();var myOptions = {content: boxText,disableAutoPan: false,alignBottom: true,maxWidth: 0,pixelOffset: new google.maps.Size(-400,0),zIndex: null,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"},closeBoxURL: "close.gif",infoBoxClearance: new google.maps.Size(1, 1),isHidden: false,pane: "floatPane"};var ib = new InfoBox(myOptions); ib.open(map, marker, myOptions); }}},
									
									{start : "1883", point : { lat : 38.895112000000, lon : -77.03636600000 },title : "Civil Rights Cases", options : {theme: SBANtheme, description:"", openInfoWindow: function(){ var boxText = "<div ><iframe id='partnerPlayer' frameborder='0' marginwidth='0' marginheight='0' scrolling='no' style='width:256px; height:144px; margin-left: 5px' src='http://video.pbs.org/widget/partnerplayer/2178292430/?w=256&amp;h=144&amp;chapterbar=False&amp;autoplay=False' align='right'></iframe>Five different civil rights cases were combined and presented to the U.S. Supreme Court. Each of the cases dealt with blacks who had been refused admittance to \"whites only\" areas of theatres, hotels, or trains. The Supreme Court ruled that the discrimination had not been illegal  that the Fourteenth Amendment prohibits state discrimination, not private discrimination, and that the Thirteenth Amendment did not prevent the discrimination, either. In response to the ruling, Republicans no longer attempted to pursue equality for blacks in public life.  </div>";var description = this.opts.description; var marker = this.getNativePlacemark();var map = this.map.getMap();var myOptions = {content: boxText,disableAutoPan: false,alignBottom: true,maxWidth: 0,pixelOffset: new google.maps.Size(-400,0),zIndex: null,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"},closeBoxURL: "close.gif",infoBoxClearance: new google.maps.Size(1, 1),isHidden: false,pane: "floatPane"};var ib = new InfoBox(myOptions); ib.open(map, marker, myOptions); }}},
									
									{start : "1883",  point : { lat : 32.803282, lon : -96.778564 },title : "Convict Leasing Reforms", options : {theme: SBANtheme_invisible, description:"", openInfoWindow: function(){ var boxText = "<div >As part of a series of changes in convict leasing, Alabama created an office of prison inspector to oversee conditions for convict laborers. The inspectors described wretched conditions for convict laborers. New rules for leasing began to require minimum standards for treatment and rules for punishments. These reforms brought modest improvements. </div>";var description = this.opts.description; var marker = this.getNativePlacemark();var map = this.map.getMap();var myOptions = {content: boxText,disableAutoPan: false,alignBottom: true,maxWidth: 0,pixelOffset: new google.maps.Size(-400,0),zIndex: null,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"},closeBoxURL: "close.gif",infoBoxClearance: new google.maps.Size(1, 1),isHidden: false,pane: "floatPane"};var ib = new InfoBox(myOptions); ib.open(map, marker, myOptions); }}},
									
									{start : "1890", end : "1899",  point : { lat : 32.803282, lon : -96.778564 },title : "Life in the 1890s", options : {theme: SBANtheme_invisible, description:"", openInfoWindow: function(){ var boxText = "<div >The start of the 1890s brought promise, as the economic expansion and promise of the 'Gilded Age' continued until the Panic of 1893. During those years, populist frustrations with bankers, economic inequalities, working conditions, and government corruption grew. After the economy recovered in 1897, support for Progressive values intensified. At the end of the nineteenth century, progressives sought to eliminate corruption and monopolies, while also fighting for women's suffrage, labor rights, social welfare, prohibition, universal education, civil liberties, and fair trade. Immigrants continued to arrive in large numbers, and often faced opposition from union workers who feared the new arrivals would undercut wages. In 1890, Idaho and Wyoming were admitted as states, and Utah was admitted in 1896. </div>";var description = this.opts.description; var marker = this.getNativePlacemark();var map = this.map.getMap();var myOptions = {content: boxText,disableAutoPan: false,alignBottom: true,maxWidth: 0,pixelOffset: new google.maps.Size(-400,0),zIndex: null,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"},closeBoxURL: "close.gif",infoBoxClearance: new google.maps.Size(1, 1),isHidden: false,pane: "floatPane"};var ib = new InfoBox(myOptions); ib.open(map, marker, myOptions); }}},
									
									{start : "1890", point : { lat : 41.878114000000, lon : -87.62979800000  },title : "Pullman Company Town", options : {theme: SBANtheme, description:"", openInfoWindow: function(){ var boxText = "<div >George Pullman, the builder of railroad cars, developed one of the first and most well-known company towns. Located just south of Chicago, all of Pullman's houses, hotels, and stores were owned by the company. Though Pullman was designed with sincere intentions and generally pleasing results, most company towns were not so pleasing. The total control over worker's lives, food costs, and homes was unpopular, and fed the resentment that caused the Pullman Strike in 1894. In 1898, the Illinois Supreme Court ordered Pullman to be sold off.  </div>";var description = this.opts.description; var marker = this.getNativePlacemark();var map = this.map.getMap();var myOptions = {content: boxText,disableAutoPan: false,alignBottom: true,maxWidth: 0,pixelOffset: new google.maps.Size(-400,0),zIndex: null,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"},closeBoxURL: "close.gif",infoBoxClearance: new google.maps.Size(1, 1),isHidden: false,pane: "floatPane"};var ib = new InfoBox(myOptions); ib.open(map, marker, myOptions); }}},
									
									{start : "1890",  point : { lat : 43.140544000000, lon : -102.36571500000  },title : "Massacre at Wounded Knee. ", options : {theme: SBANtheme, description:"", openInfoWindow: function(){ var boxText = "<div >At the Pine Ridge Reservation in South Dakota, a group of federal troops attempted to disarm a group of Lakota. Gunfire erupted, and soldiers began firing indiscriminately. Over 150 Lakota men, women, and children were killed  some of them as they attempted to flee. This is often considered the final major event of the U.S.-Indian wars.  </div>";var description = this.opts.description; var marker = this.getNativePlacemark();var map = this.map.getMap();var myOptions = {content: boxText,disableAutoPan: false,alignBottom: true,maxWidth: 0,pixelOffset: new google.maps.Size(-400,0),zIndex: null,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"},closeBoxURL: "close.gif",infoBoxClearance: new google.maps.Size(1, 1),isHidden: false,pane: "floatPane"};var ib = new InfoBox(myOptions); ib.open(map, marker, myOptions); }}},
									
									{start : "1893",  point : { lat : 41.783417000000, lon : -87.57637400000  },title : "World's Columbian Exposition", options : {theme: SBANtheme, description:"", openInfoWindow: function(){ var boxText = "<div >Chicago hosted the World's Fair this year, creating a \"White City\" of classically inspired temporary buildings to showcase displays from across the country and around the world. Arts, architecture, and industry were glorified and novelties such as the Ferris Wheel, electric lighting, ragtime music, and the midway carnival were popular with the crowds.  </div>";var description = this.opts.description; var marker = this.getNativePlacemark();var map = this.map.getMap();var myOptions = {content: boxText,disableAutoPan: false,alignBottom: true,maxWidth: 0,pixelOffset: new google.maps.Size(-400,0),zIndex: null,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"},closeBoxURL: "close.gif",infoBoxClearance: new google.maps.Size(1, 1),isHidden: false,pane: "floatPane"};var ib = new InfoBox(myOptions); ib.open(map, marker, myOptions); }}},
									
									{start : "1893",end : "1897",  point : { lat : 32.803282, lon : -96.778564 },title : "Panic of 1893", options : {theme: SBANtheme_invisible, description:"", openInfoWindow: function(){ var boxText = "<div >Over-extended railroad credit caused a series of bank runs, bank failures, and railroad company bankruptcies that once again caused a huge economic crisis. High unemployment and decreased wages devastated laborers, and farmers suffered from decreased prices due to reduced demand. The growing middle class was shaken, and unions were strengthened as laborers organized.    </div>";var description = this.opts.description; var marker = this.getNativePlacemark();var map = this.map.getMap();var myOptions = {content: boxText,disableAutoPan: false,alignBottom: true,maxWidth: 0,pixelOffset: new google.maps.Size(-400,0),zIndex: null,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"},closeBoxURL: "close.gif",infoBoxClearance: new google.maps.Size(1, 1),isHidden: false,pane: "floatPane"};var ib = new InfoBox(myOptions); ib.open(map, marker, myOptions); }}},
									
									{start : "1893", point : { lat : 32.803282, lon : -96.778564 },title : "Convict Leasing Begins to Decline", options : {theme: SBANtheme_invisible, description:"", openInfoWindow: function(){ var boxText = "<div ><iframe id='partnerPlayer' frameborder='0' marginwidth='0' marginheight='0' scrolling='no' style='width:256px; height:144px; margin-left: 5px' src='http://video.pbs.org/widget/partnerplayer/2178297295/?w=256&amp;h=144&amp;chapterbar=False&amp;autoplay=False' align='right'></iframe>Tennessee stopped leasing convicts to coal mines in 1893, and all state leasing of convicts in 1896. [9]10] South Carolina followed suit in 1897, with the elimination of state leasing of convicts.[11] In many cases, the convicts were now transferred to prison-run chain gangs.     [9]SBAN, p. 351.   [10]WTS, p. 82.   [11]SBAN, p. 351.</div>";var description = this.opts.description; var marker = this.getNativePlacemark();var map = this.map.getMap();var myOptions = {content: boxText,disableAutoPan: false,alignBottom: true,maxWidth: 0,pixelOffset: new google.maps.Size(-400,0),zIndex: null,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"},closeBoxURL: "close.gif",infoBoxClearance: new google.maps.Size(1, 1),isHidden: false,pane: "floatPane"};var ib = new InfoBox(myOptions); ib.open(map, marker, myOptions); }}},
		 
		 {start : "1896",  point : { lat : 29.949857827165, lon : -90.10986328125  },title : "Plessy v. Ferguson ", options : {theme: SBANtheme, description:"", openInfoWindow: function(){ var boxText = "<div ><iframe id='partnerPlayer' frameborder='0' marginwidth='0' marginheight='0' scrolling='no' style='width:256px; height:144px; margin-left: 5px' src='http://video.pbs.org/widget/partnerplayer/2178292430/?w=256&amp;h=144&amp;chapterbar=False&amp;autoplay=False' align='right'></iframe>In 1892, Homer Plessy and a group of activists in New Orleans sought to challenge the constitutionality of a Louisiana Jim Crow law requiring segregation on railroad cars. Plessy, who was one-eighth black, argued that his right to ride on a white car was protected by the Fourteenth Amendment. In 1896, the Supreme Court ruled against him, deciding that the Louisiana law was not in conflict with the Fourteenth Amendment, and legitimizing segregation as 'separate but equal.'  </div>";var description = this.opts.description; var marker = this.getNativePlacemark();var map = this.map.getMap();var myOptions = {content: boxText,disableAutoPan: false,alignBottom: true,maxWidth: 0,pixelOffset: new google.maps.Size(-400,0),zIndex: null,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"},closeBoxURL: "close.gif",infoBoxClearance: new google.maps.Size(1, 1),isHidden: false,pane: "floatPane"};var ib = new InfoBox(myOptions); ib.open(map, marker, myOptions); }}},
		 
		 {start : "1899",point : { lat : 33.727690042849, lon : -84.40246582031  },title : "Eberhart Case", options : {theme: SBANtheme, description:"", openInfoWindow: function(){ var boxText = "<div >The Justice Department attempted to convict the Georgia planter William Eberhart of peonage after he forced the Calloway family to work for him and violently assaulted them. Though Eberhart's cruel reputation was well-known, local white families came to his defense. A federal judge dismissed the case, stating there was no specific statue against peonage, disregarding the language of the Thirteenth Amendment.  </div>";var description = this.opts.description; var marker = this.getNativePlacemark();var map = this.map.getMap();var myOptions = {content: boxText,disableAutoPan: false,alignBottom: true,maxWidth: 0,pixelOffset: new google.maps.Size(-400,0),zIndex: null,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"},closeBoxURL: "close.gif",infoBoxClearance: new google.maps.Size(1, 1),isHidden: false,pane: "floatPane"};var ib = new InfoBox(myOptions); ib.open(map, marker, myOptions); }}},
		 
		 {start : "1900",end : "1909",  point : { lat : 32.803282, lon : -96.778564 }, title : "Life in the 1900s ", options : {theme: SBANtheme_invisible, description:"", openInfoWindow: function(){ var boxText = "<div >When President McKinley was shot in 1901, Theodore Roosevelt took office, ushering a new era of progressive politics and policies at the federal level. American attitudes about the 'negro problem,' including segregation, poverty, and peonage, were mixed. The progressive attitudes that favored fair play and the elimination of corruption helped to eradicate peonage in some states while the hesitation to over-ride state's authority or regional custom through federal efforts allowed it to remain in others. In the south, poll taxes and other requirements prevented the voting of nearly all black men, and many of the poor white ones, as well. The world continued to grow faster and smaller, as new technologies such as the electric typewriter, affordable personal cameras, automobiles, and ship-to-shore radios allowed new ideas to travel quickly. The San Francisco earthquake occurred in 1906, and Oklahoma was admitted as a state in 1907. </div>";var description = this.opts.description; var marker = this.getNativePlacemark();var map = this.map.getMap();var myOptions = {content: boxText,disableAutoPan: false,alignBottom: true,maxWidth: 0,pixelOffset: new google.maps.Size(-400,0),zIndex: null,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"},closeBoxURL: "close.gif",infoBoxClearance: new google.maps.Size(1, 1),isHidden: false,pane: "floatPane"};var ib = new InfoBox(myOptions); ib.open(map, marker, myOptions); }}},
		 
		 {start : "1901",  point : { lat : 32.803282, lon : -96.778564 }, title : "Teddy Roosevelt and Black Causes", options : {theme: SBANtheme_invisible, description:"", openInfoWindow: function(){ var boxText = "<div ><iframe id='partnerPlayer' frameborder='0' marginwidth='0' marginheight='0' scrolling='no' style='width:256px; height:144px; margin-left: 5px' src='http://video.pbs.org/widget/partnerplayer/2178670636/?w=256&amp;h=144&amp;chapterbar=False&amp;autoplay=False' align='right'></iframe>Less than a month after taking office, President Theodore Roosevelt dined with black intellectual and political advisor, Booker T. Washington, in the White House. The resulting public uproar over the perceived impropriety startled Roosevelt, who then took a softer approach to black issues. He did, however, promote federal prosecution of peonage, and the resulting investigations, trials, and convictions brought the first federal blow to the system. </div>";var description = this.opts.description; var marker = this.getNativePlacemark();var map = this.map.getMap();var myOptions = {content: boxText,disableAutoPan: false,alignBottom: true,maxWidth: 0,pixelOffset: new google.maps.Size(-400,0),zIndex: null,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"},closeBoxURL: "close.gif",infoBoxClearance: new google.maps.Size(1, 1),isHidden: false,pane: "floatPane"};var ib = new InfoBox(myOptions); ib.open(map, marker, myOptions); }}},
		 
		 {start : "1901", point : { lat : 32.803282, lon : -96.778564 },title : "Convict Leasing Continues to Decline", options : {theme: SBANtheme_invisible, description:"", openInfoWindow: function(){ var boxText = "<div >Public outrage over scandalous tales of abuse helped end the practice of state leasing of convicts by the states of Louisiana (1901), Mississippi (1907), and Georgia (1908). </div>";var description = this.opts.description; var marker = this.getNativePlacemark();var map = this.map.getMap();var myOptions = {content: boxText,disableAutoPan: false,alignBottom: true,maxWidth: 0,pixelOffset: new google.maps.Size(-400,0),zIndex: null,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"},closeBoxURL: "close.gif",infoBoxClearance: new google.maps.Size(1, 1),isHidden: false,pane: "floatPane"};var ib = new InfoBox(myOptions); ib.open(map, marker, myOptions); }}},
		 
		 {start : "1903", point : { lat : 33.384975, lon : -86.791992 },title : "Alabama tightens contract labor laws ", options : {theme: SBANtheme, description:"", openInfoWindow: function(){ var boxText = "<div >Prior to 1903, if a worker skipped out after receiving an advance, an employer had to prove that fraud had always been the worker's intention. The new law no longer required any evidence of bad intention by the worker. Now, any white employer could claim a black worker had taken an advance and not repaid it, and Alabama courts would not accept black workers' testimony in court. Georgia passed a similar law in 1903, and Florida in 1907. </div>";var description = this.opts.description; var marker = this.getNativePlacemark();var map = this.map.getMap();var myOptions = {content: boxText,disableAutoPan: false,alignBottom: true,maxWidth: 0,pixelOffset: new google.maps.Size(-400,0),zIndex: null,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"},closeBoxURL: "close.gif",infoBoxClearance: new google.maps.Size(1, 1),isHidden: false,pane: "floatPane"};var ib = new InfoBox(myOptions); ib.open(map, marker, myOptions); }}},
		 
		 {start : "1905", point : { lat : 32.803282, lon : -96.778564 }, title : "The Clansman is published", options : {theme: SBANtheme_invisible, description:"", openInfoWindow: function(){ var boxText = "<div >The second in a trilogy written by Thomas F. Dixon, Jr., The Clansman depicted a romantic view of white Southerners forming the Ku Klux Klan in order to defend white women from violence by black men. Dixon wrote a play of the same name, and both were popular.   </div>";var description = this.opts.description; var marker = this.getNativePlacemark();var map = this.map.getMap();var myOptions = {content: boxText,disableAutoPan: false,alignBottom: true,maxWidth: 0,pixelOffset: new google.maps.Size(-400,0),zIndex: null,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"},closeBoxURL: "close.gif",infoBoxClearance: new google.maps.Size(1, 1),isHidden: false,pane: "floatPane"};var ib = new InfoBox(myOptions); ib.open(map, marker, myOptions); }}},
		 
		 {start : "1906", point : { lat : 31.010458000000, lon : -86.34966900000},title : "Jackson Lumber Company Peonage Case", options : {theme: SBANtheme, description:"", openInfoWindow: function(){ var boxText = "<div >The guilty verdict against the Jackson Lumber Company brought attention to ongoing peonage in the south. The status of the victims as white immigrants brought their cases more publicity.[12]     [12]  SOS, p. 90.  </div>";var description = this.opts.description; var marker = this.getNativePlacemark();var map = this.map.getMap();var myOptions = {content: boxText,disableAutoPan: false,alignBottom: true,maxWidth: 0,pixelOffset: new google.maps.Size(-400,0),zIndex: null,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"},closeBoxURL: "close.gif",infoBoxClearance: new google.maps.Size(1, 1),isHidden: false,pane: "floatPane"};var ib = new InfoBox(myOptions); ib.open(map, marker, myOptions); }}},
		 
		 {start : "1906", point : { lat : 33.748995000000, lon : -84.38798200000},title : "Atlanta Race Riots ", options : {theme: SBANtheme, description:"", openInfoWindow: function(){ var boxText = "<div >Incensed by scandalous (and likely false) accounts of four rapes of white women by black men, thousands of white Atlantans riot and target black businesses, homes, and people. After four days, an estimated 25 to 40 blacks were killed. The news had international attention, and shamed local white political leaders into conversation with African Americans. African Americans became increasingly unwilling to follow the accommodation tactics promoted by Booker T. Washington.  </div>";var description = this.opts.description; var marker = this.getNativePlacemark();var map = this.map.getMap();var myOptions = {content: boxText,disableAutoPan: false,alignBottom: true,maxWidth: 0,pixelOffset: new google.maps.Size(-400,0),zIndex: null,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"},closeBoxURL: "close.gif",infoBoxClearance: new google.maps.Size(1, 1),isHidden: false,pane: "floatPane"};var ib = new InfoBox(myOptions); ib.open(map, marker, myOptions); }}},
		 
		 {start : "1908",  point : { lat : 39.781721000000, lon : -89.65014800000},title : "Springfield Race Riots", options : {theme: SBANtheme, description:"", openInfoWindow: function(){ var boxText = "<div> <a href='#' onclick=MakeRequest('springfield');><img src='/tpt/slavery-by-another-name/media/maps/images/Springfield_Race_Riot_thumb.jpg' alt='Springfield Race Riot thumb image' title='Springfield Race Riot aftermath. {click for larger image)' border='0' align='left' /></a>Enraged that a county sheriff in Springfield, Illinois had protected two black suspects from the city jail by transferring them, a mob of white residents turned against the black neighborhoods of the town.  Over two days, hundreds of black homes and businesses were destroyed, and more than seven people die. National Guard troops were called in to restore order.</div>";var description = this.opts.description; var marker = this.getNativePlacemark();var map = this.map.getMap();var myOptions = {content: boxText,disableAutoPan: false,alignBottom: true,maxWidth: 0,pixelOffset: new google.maps.Size(-400,0),zIndex: null,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"},closeBoxURL: "close.gif",infoBoxClearance: new google.maps.Size(1, 1),isHidden: false,pane: "floatPane"};var ib = new InfoBox(myOptions); ib.open(map, marker, myOptions); }}},
		 
		 {start : "1909",  point : { lat : 32.803282, lon : -96.778564 },title : "Birth of NAACP", options : {theme: SBANtheme_invisible, description:"", openInfoWindow: function(){ var boxText = "<div >In response to recent riots and more Jim Crow laws, a group of black and white intellectuals, social welfare workers, labor activists, and journalists formed the National Association for the Advancement for Colored People in New York City. The NAACP dedicates itself to promoting equal rights, attaining suffrage, and accessing equal education and job opportunities for blacks. Early efforts focused on overturning Jim Crow laws. </div>";var description = this.opts.description; var marker = this.getNativePlacemark();var map = this.map.getMap();var myOptions = {content: boxText,disableAutoPan: false,alignBottom: true,maxWidth: 0,pixelOffset: new google.maps.Size(-400,0),zIndex: null,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"},closeBoxURL: "close.gif",infoBoxClearance: new google.maps.Size(1, 1),isHidden: false,pane: "floatPane"};var ib = new InfoBox(myOptions); ib.open(map, marker, myOptions); }}},
		 
		 {start : "1910",end : "1919", point : { lat : 32.803282, lon : -96.778564 }, title : "Life In the 1910s:", options : {theme: SBANtheme_invisible, description:"", openInfoWindow: function(){ var boxText = "<div >During this decade, the United States' position in the world as an industrial and military power became solidified. Immigration, industrialization, and urbanization boomed. Automobiles, telephones, steamships, and wireless radio made the world smaller. Arizona and New Mexico became the final territories on the continent to become states. After World War I, women and African Americans began to advocate more vocally for suffrage and civil rights. As a result of the Great Migration, Africans Americans had jobs, voting rights, and the opportunity to openly advocate for political change. Though still second-class citizens in Northern states, African Americans began to find and use a louder voice in the national debate.    </div>";var description = this.opts.description; var marker = this.getNativePlacemark();var map = this.map.getMap();var myOptions = {content: boxText,disableAutoPan: false,alignBottom: true,maxWidth: 0,pixelOffset: new google.maps.Size(-400,0),zIndex: null,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"},closeBoxURL: "close.gif",infoBoxClearance: new google.maps.Size(1, 1),isHidden: false,pane: "floatPane"};var ib = new InfoBox(myOptions); ib.open(map, marker, myOptions); }}},
		 
		 {start : "1910", point : { lat : 32.803282, lon : -96.778564 }, title : "Great Migration begins", options : {theme: SBANtheme_invisible, description:"", openInfoWindow: function(){ var boxText = "<div > <iframe id='partnerPlayer' frameborder='0' marginwidth='0' marginheight='0' scrolling='no' style='width:256px; height:144px; margin-left: 5px' src='http://video.pbs.org/widget/partnerplayer/2178370192/?w=256&amp;h=144&amp;chapterbar=False&amp;autoplay=False' align='right'></iframe> As transportation networks enlarge and northern industrialists recruited black laborers from the South, opportunities for blacks expanded. Moving to new jobs and away from the terror of Jim Crow proved attractive to millions of southern blacks, and the wave of internal migration changed the populations of urban centers such as New York City, Chicago, and Detroit and provided new upward mobility and educational opportunities. The Great Migration had an extra burst of energy during the World War I because of the availability of wartime jobs, but this first wave continued through to 1930.  </div>";var description = this.opts.description; var marker = this.getNativePlacemark();var map = this.map.getMap();var myOptions = {content: boxText,disableAutoPan: false,alignBottom: true,maxWidth: 0,pixelOffset: new google.maps.Size(-400,0),zIndex: null,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"},closeBoxURL: "close.gif",infoBoxClearance: new google.maps.Size(1, 1),isHidden: false,pane: "floatPane"};var ib = new InfoBox(myOptions); ib.open(map, marker, myOptions); }}},
		 
		 {start : "1911",  point : { lat : 32.803282, lon : -96.778564 }, title : "The National Urban League founded", options : {theme: SBANtheme_invisible, description:"", openInfoWindow: function(){ var boxText = "<div >Originally called the National League on Urban Conditions Among Negroes, the League is formed by a merger of three related organizations. The League's focus in early years was to help recent migrants from the South, train social workers, and bring educational and job opportunities to urban blacks. By the end of World War I, the League had chapters in thirty cities. </div>";var description = this.opts.description; var marker = this.getNativePlacemark();var map = this.map.getMap();var myOptions = {content: boxText,disableAutoPan: false,alignBottom: true,maxWidth: 0,pixelOffset: new google.maps.Size(-400,0),zIndex: null,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"},closeBoxURL: "close.gif",infoBoxClearance: new google.maps.Size(1, 1),isHidden: false,pane: "floatPane"};var ib = new InfoBox(myOptions); ib.open(map, marker, myOptions); }}},
		 
		 {start : "1911", point : { lat : 38.895112000000, lon : -77.03636600000},title : "Bailey v. Alabama ", options : {theme: SBANtheme, description:"", openInfoWindow: function(){ var boxText = "<div > <iframe id='partnerPlayer' frameborder='0' marginwidth='0' marginheight='0' scrolling='no' style='width:256px; height:144px; margin-left: 5px' src='http://video.pbs.org/widget/partnerplayer/2178367803/?w=256&amp;h=144&amp;chapterbar=False&amp;autoplay=False' align='right'></iframe> U.S. Supreme Court strikes down the 1903 Alabama contract labor law as unconstitutional for violating the peonage statute. In 1914, the Supreme Court rules in U.S. v. Reynolds that Alabama employers cannot take a man from prison and force him to pay off the fees that the employer paid on his behalf. </div>";var description = this.opts.description; var marker = this.getNativePlacemark();var map = this.map.getMap();var myOptions = {content: boxText,disableAutoPan: false,alignBottom: true,maxWidth: 0,pixelOffset: new google.maps.Size(-400,0),zIndex: null,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"},closeBoxURL: "close.gif",infoBoxClearance: new google.maps.Size(1, 1),isHidden: false,pane: "floatPane"};var ib = new InfoBox(myOptions); ib.open(map, marker, myOptions); }}},
		 
		 {start : "1912", point : { lat : 32.803282, lon : -96.778564 }, title : "Woodrow Wilson elected ", options : {theme: SBANtheme_invisible, description:"", openInfoWindow: function(){ var boxText = "<div >Though a progressive in many ways, such as his support for a federal income tax and his anti-monopoly stance, Wilson was also a segregationist. During World War I, black soldiers were paid equal wages as whites, but were segregated and often placed in lower-status support roles rather than combat positions. </div>";var description = this.opts.description; var marker = this.getNativePlacemark();var map = this.map.getMap();var myOptions = {content: boxText,disableAutoPan: false,alignBottom: true,maxWidth: 0,pixelOffset: new google.maps.Size(-400,0),zIndex: null,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"},closeBoxURL: "close.gif",infoBoxClearance: new google.maps.Size(1, 1),isHidden: false,pane: "floatPane"};var ib = new InfoBox(myOptions); ib.open(map, marker, myOptions); }}},
		 
		 {start : "1913",  point : { lat : 32.803282, lon : -96.778564 }, title : "More Declines in Convict Leasing", options : {theme: SBANtheme_invisible, description:"", openInfoWindow: function(){ var boxText = "<div >Arkansas eliminated the leasing of convicts by the state.[13] Florida followed suit in 1919, while at the same time strengthening the contract labor laws that ensnared men into private peonage.   [13]  WTS, p. 69.  </div>";var description = this.opts.description; var marker = this.getNativePlacemark();var map = this.map.getMap();var myOptions = {content: boxText,disableAutoPan: false,alignBottom: true,maxWidth: 0,pixelOffset: new google.maps.Size(-400,0),zIndex: null,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"},closeBoxURL: "close.gif",infoBoxClearance: new google.maps.Size(1, 1),isHidden: false,pane: "floatPane"};var ib = new InfoBox(myOptions); ib.open(map, marker, myOptions); }}},
		 
		 {start : "1915",  point : { lat : 32.803282, lon : -96.778564 }, title : "Birth of a Nation is released", options : {theme: SBANtheme_invisible, description:"", openInfoWindow: function(){ var boxText = "<div >Based on the 1905 book The Clansman, the film Birth of a Nation was directory D.W. Griffith's first blockbuster film. Its romanticized depiction of the birth of the KKK and portrayal of black men as sexual aggressors enflamed white audiences and lead to riots. The NAACP protested the film, and several Northern cities banned it. </div><div><object width='330' height='261' classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000'><param value='true' name='allowfullscreen'/><param value='always' name='allowscriptaccess'/><param value='high' name='quality'/><param value='true' name='cachebusting'/><param value='#000000' name='bgcolor'/><param name='movie' value='http://www.archive.org/flow/flowplayer.commercial-3.2.1.swf' /><param value='config={'key':'#$aa4baff94a9bdcafce8','playlist':['format=Thumbnail?.jpg',{'autoPlay':false,'url':'birth_of_a_nation_512kb.mp4'}],'clip':{'autoPlay':true,'baseUrl':'http://www.archive.org/download/dw_griffith_birth_of_a_nation/','scaling':'fit','provider':'h264streaming','showCaptions':true},'canvas':{'backgroundColor':'#000000','backgroundGradient':'none'},'plugins':{'controls':{'playlist':false,'fullscreen':true,'height':26,'backgroundColor':'#000000','autoHide':{'fullscreenOnly':true}},'h264streaming':{'url':'http://www.archive.org/flow/flowplayer.pseudostreaming-3.2.1.swf'},'captions':{'url':'http://www.archive.org/flow/flowplayer.captions-3.2.0.swf','captionTarget':'content'},'content':{'display':'block','url':'http://www.archive.org/flow/flowplayer.content-3.2.0.swf','bottom':26,'left':0,'width':330,'height':50,'backgroundGradient':'none','backgroundColor':'transparent','textDecoration':'outline','border':0,'style':{'body':{'fontSize':'14','fontFamily':'Arial','textAlign':'center','fontWeight':'bold','color':'#ffffff'}}}},'contextMenu':[{},'-','Flowplayer v3.2.1']}' name='flashvars'/><embed src='http://www.archive.org/flow/flowplayer.commercial-3.2.1.swf' type='application/x-shockwave-flash' width='330' height='261' allowfullscreen='true' allowscriptaccess='always' cachebusting='true' bgcolor='#000000' quality='high' flashvars='config={'key':'#$aa4baff94a9bdcafce8','playlist':['format=Thumbnail?.jpg',{'autoPlay':false,'url':'birth_of_a_nation_512kb.mp4'}],'clip':{'autoPlay':true,'baseUrl':'http://www.archive.org/download/dw_griffith_birth_of_a_nation/','scaling':'fit','provider':'h264streaming','showCaptions':true},'canvas':{'backgroundColor':'#000000','backgroundGradient':'none'},'plugins':{'controls':{'playlist':false,'fullscreen':true,'height':26,'backgroundColor':'#000000','autoHide':{'fullscreenOnly':true}},'h264streaming':{'url':'http://www.archive.org/flow/flowplayer.pseudostreaming-3.2.1.swf'},'captions':{'url':'http://www.archive.org/flow/flowplayer.captions-3.2.0.swf','captionTarget':'content'},'content':{'display':'block','url':'http://www.archive.org/flow/flowplayer.content-3.2.0.swf','bottom':26,'left':0,'width':330,'height':50,'backgroundGradient':'none','backgroundColor':'transparent','textDecoration':'outline','border':0,'style':{'body':{'fontSize':'14','fontFamily':'Arial','textAlign':'center','fontWeight':'bold','color':'#ffffff'}}}},'contextMenu':[{},'-','Flowplayer v3.2.1']}'> </embed></object></div>";var description = this.opts.description; var marker = this.getNativePlacemark();var map = this.map.getMap();var myOptions = {content: boxText,disableAutoPan: false,alignBottom: true,maxWidth: 0,pixelOffset: new google.maps.Size(-400,0),zIndex: null,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"},closeBoxURL: "close.gif",infoBoxClearance: new google.maps.Size(1, 1),isHidden: false,pane: "floatPane"};var ib = new InfoBox(myOptions); ib.open(map, marker, myOptions); }}},
		 
		 {start : "1917",end : "1918", point : { lat : 32.803282, lon : -96.778564 }, title : "World War I", options : {theme: SBANtheme_invisible, description:"", openInfoWindow: function(){ var boxText = "<div >More than 400,000 African Americans served in World War I, mainly in segregated, support units, though units such as the Harlem Hellfighters did fight in combat while assigned to the French Army.    </div>";var description = this.opts.description; var marker = this.getNativePlacemark();var map = this.map.getMap();var myOptions = {content: boxText,disableAutoPan: false,alignBottom: true,maxWidth: 0,pixelOffset: new google.maps.Size(-400,0),zIndex: null,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"},closeBoxURL: "close.gif",infoBoxClearance: new google.maps.Size(1, 1),isHidden: false,pane: "floatPane"};var ib = new InfoBox(myOptions); ib.open(map, marker, myOptions); }}},
		 
		 {start : "1917",  point : { lat : 38.6155556, lon : -90.1277778}, title : "East St. Louis Riot", options : {theme: SBANtheme, description:"", openInfoWindow: function(){ var boxText = "<div >Competition for jobs between newly arrived black Southerners and local whites raised tensions in the city, and violence erupted. After two months of sporadic riots, thousands of whites formed a mob and attacked the black neighborhood, lynching and murdering around 200 people, and destroying their homes and businesses. </div>";var description = this.opts.description; var marker = this.getNativePlacemark();var map = this.map.getMap();var myOptions = {content: boxText,disableAutoPan: false,alignBottom: true,maxWidth: 0,pixelOffset: new google.maps.Size(-400,0),zIndex: null,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"},closeBoxURL: "close.gif",infoBoxClearance: new google.maps.Size(1, 1),isHidden: false,pane: "floatPane"};var ib = new InfoBox(myOptions); ib.open(map, marker, myOptions); }}},
		 
		 {start : "1920",end : "1929", point : { lat : 32.803282, lon : -96.778564 },title : "Life in the 1920s", options : {theme: SBANtheme_invisible, description:"", openInfoWindow: function(){ var boxText = "<div >Often called the 'Roaring Twenties,' this decade was marked by strong economic growth, increased status for women, fast cars, jazz, radio, and talking movies. Popular culture captured the sense of opportunity, optimism, and modernity that was widespread for both whites and blacks. As the Great Migration continued and the Harlem Renaissance developed, the black middle class expanded and increased its influence on politics and culture. Talking movies and phonographs also disseminated ideas, showcasing new trends such as jazz and flappers. Charles Lindbergh flew non-stop across Atlantic in 1927, to worldwide acclaim.  </div>";var description = this.opts.description; var marker = this.getNativePlacemark();var map = this.map.getMap();var myOptions = {content: boxText,disableAutoPan: false,alignBottom: true,maxWidth: 0,pixelOffset: new google.maps.Size(-400,0),zIndex: null,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"},closeBoxURL: "close.gif",infoBoxClearance: new google.maps.Size(1, 1),isHidden: false,pane: "floatPane"};var ib = new InfoBox(myOptions); ib.open(map, marker, myOptions); }}},
		 
		 {start : "1920",  point : { lat : 40.811382000000, lon : -73.94479900000},title : "Harlem Renaissance Begins", options : {theme: SBANtheme, description:"", openInfoWindow: function(){ var boxText = "<div >As a result of the Great Migration, the economic opportunities of World War I, and the demographic concentration of an ambitious, black middle class, a wave of African American music, literature, poetry, and fine art swells out of Harlem and other urban cores. The new works depict uplifting images of a \"new negro\"  an intellectual, productive, proud, modern, and sophisticated identity that inspires and replaces damaging racist stereotypes. The Harlem Renaissance continues through to the mid 1930s, and inspires a generation of civil rights activists. </div>";var description = this.opts.description; var marker = this.getNativePlacemark();var map = this.map.getMap();var myOptions = {content: boxText,disableAutoPan: false,alignBottom: true,maxWidth: 0,pixelOffset: new google.maps.Size(-400,0),zIndex: null,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"},closeBoxURL: "close.gif",infoBoxClearance: new google.maps.Size(1, 1),isHidden: false,pane: "floatPane"};var ib = new InfoBox(myOptions); ib.open(map, marker, myOptions); }}},
		 
		 {start : "1920",  point : { lat : 32.803282, lon : -96.778564 },title : "19th Amendment", options : {theme: SBANtheme_invisible, description:"", openInfoWindow: function(){ var boxText = "<div >After more than seventy years of advocacy, all women get the right to vote with the passage of the Nineteenth Amendment.   <a href='#' onclick=MakeRequest('nineteenth');> The 19th Ammendment</a> </div>";var description = this.opts.description; var marker = this.getNativePlacemark();var map = this.map.getMap();var myOptions = {content: boxText,disableAutoPan: false,alignBottom: true,maxWidth: 0,pixelOffset: new google.maps.Size(-400,0),zIndex: null,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"},closeBoxURL: "close.gif",infoBoxClearance: new google.maps.Size(1, 1),isHidden: false,pane: "floatPane"};var ib = new InfoBox(myOptions); ib.open(map, marker, myOptions); }}},
		 
		 {start : "1921",  point : { lat : 33.740177, lon : -84.396973 }, title : "The Negro in Georgia ", options : {theme: SBANtheme, description:"", openInfoWindow: function(){ var boxText = "<div >Governor Hugh M. Dorsey releases a 24-page booklet describing cruelty against and peonage of blacks in Georgia over the past few years. A committee of 39 citizens approves of resolutions to remedy the problems through ideas such as establishing segregated committees on race relations, imposing a penalty on counties where lynchings occur, and encouraging segregated churches to preach mercy and mutual forbearance.[14]    [14]  SOS, p. 127.  </div>";var description = this.opts.description; var marker = this.getNativePlacemark();var map = this.map.getMap();var myOptions = {content: boxText,disableAutoPan: false,alignBottom: true,maxWidth: 0,pixelOffset: new google.maps.Size(-400,0),zIndex: null,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"},closeBoxURL: "close.gif",infoBoxClearance: new google.maps.Size(1, 1),isHidden: false,pane: "floatPane"};var ib = new InfoBox(myOptions); ib.open(map, marker, myOptions); }}},
		 
		 {start : "1923", point : { lat : 33.740177, lon : -84.396973 }, title : "Florida eliminates county convict leasing ", options : {theme: SBANtheme, description:"", openInfoWindow: function(){ var boxText = "<div >Under public pressure, Florida eliminates convict leasing by counties. The public was outraged at the death of Martin Tabert by a horrific whipping at a turpentine camp.    [15]  WTS, p. 75.  </div>";var description = this.opts.description; var marker = this.getNativePlacemark();var map = this.map.getMap();var myOptions = {content: boxText,disableAutoPan: false,alignBottom: true,maxWidth: 0,pixelOffset: new google.maps.Size(-400,0),zIndex: null,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"},closeBoxURL: "close.gif",infoBoxClearance: new google.maps.Size(1, 1),isHidden: false,pane: "floatPane"};var ib = new InfoBox(myOptions); ib.open(map, marker, myOptions); }}},
		 
		 {start : "1925", point : { lat : 32.803282, lon : -96.778564 }, title : "Brotherhood of Sleeping Car Porters ", options : {theme: SBANtheme_invisible, description:"", openInfoWindow: function(){ var boxText = "<div >The occupation as a railroad porter was one of the few middle-class jobs available to black men during this time. Though pay was generally good, it way highly tied to the tips and therefore whims of white customers. After years of efforts to organize, the Brotherhood of Sleeping Car Porters unionized, becoming the first black-led labor organization </div>";var description = this.opts.description; var marker = this.getNativePlacemark();var map = this.map.getMap();var myOptions = {content: boxText,disableAutoPan: false,alignBottom: true,maxWidth: 0,pixelOffset: new google.maps.Size(-400,0),zIndex: null,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"},closeBoxURL: "close.gif",infoBoxClearance: new google.maps.Size(1, 1),isHidden: false,pane: "floatPane"};var ib = new InfoBox(myOptions); ib.open(map, marker, myOptions); }}},
		 
		 {start : "1928", point : { lat : 38.895112000000, lon : -77.03636600000}, title : "Convict Leasing by State Ends", options : {theme: SBANtheme, description:"", openInfoWindow: function(){ var boxText = "<div >Alabama became the final state to eliminate convict leasing by the state.[16]   [16]  SBAN, p.369.  </div>";var description = this.opts.description; var marker = this.getNativePlacemark();var map = this.map.getMap();var myOptions = {content: boxText,disableAutoPan: false,alignBottom: true,maxWidth: 0,pixelOffset: new google.maps.Size(-400,0),zIndex: null,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"},closeBoxURL: "close.gif",infoBoxClearance: new google.maps.Size(1, 1),isHidden: false,pane: "floatPane"};var ib = new InfoBox(myOptions); ib.open(map, marker, myOptions); }}},
		 
		 {start : "1929", point : { lat : 32.803282, lon : -96.778564 },title : "Stock Market Crash", options : {theme: SBANtheme_invisible, description:"", openInfoWindow: function(){ var boxText = "<div >Throughout the 1920s Americans borrowed heavily to invest in stocks, resulting in a speculative boom.  When the market crashed in October 1929, it triggered what would become the Great Depression. </div>";var description = this.opts.description; var marker = this.getNativePlacemark();var map = this.map.getMap();var myOptions = {content: boxText,disableAutoPan: false,alignBottom: true,maxWidth: 0,pixelOffset: new google.maps.Size(-400,0),zIndex: null,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"},closeBoxURL: "close.gif",infoBoxClearance: new google.maps.Size(1, 1),isHidden: false,pane: "floatPane"};var ib = new InfoBox(myOptions); ib.open(map, marker, myOptions); }}},
		 
		 {start : "1930", end : "1939",  point : { lat : 32.803282, lon : -96.778564 }, title : "Life in the 1930s", options : {theme: SBANtheme_invisible, description:"", openInfoWindow: function(){ var boxText = "<div >Though the decade was dominated by the economic hardships of the Great Depression, and increased competition for jobs, African Americans began to gain broader support for fair treatment and equal rights. New Deal relief programs brought assistance to African Americans, and popular culture began to include black athletes, musicians, and actors. Though economic and environmental destruction of the Dust Bowl spurred many Southern sharecroppers to leave the South, the lack of economic opportunities in the North suspended the Great Migration.  </div>";var description = this.opts.description; var marker = this.getNativePlacemark();var map = this.map.getMap();var myOptions = {content: boxText,disableAutoPan: false,alignBottom: true,maxWidth: 0,pixelOffset: new google.maps.Size(-400,0),zIndex: null,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"},closeBoxURL: "close.gif",infoBoxClearance: new google.maps.Size(1, 1),isHidden: false,pane: "floatPane"};var ib = new InfoBox(myOptions); ib.open(map, marker, myOptions); }}},
		 
		 {start : "1932",  point : { lat : 32.803282, lon : -96.778564 }, title : "Chain Gangs ", options : {theme: SBANtheme_invisible, description:"", openInfoWindow: function(){ var boxText = "<div > <iframe id='partnerPlayer' frameborder='0' marginwidth='0' marginheight='0' scrolling='no' style='width:256px; height:144px; margin-left: 5px' src='http://video.pbs.org/widget/partnerplayer/2178296952/?w=256&amp;h=144&amp;chapterbar=False&amp;autoplay=False' align='right'></iframe> By the 1930s, chain gangs had replaced convict leasing by the states in the South. In 1930, over 8,000 prisoners in Georgia were forced to work on chain gangs.[17] In 1932, the publication of I Am a Fugitive from a Georgia Chain Gang and a movie based on the book caused public opinion against the practice to increase.   [17]  SBAN, p. 371.  </div>";var description = this.opts.description; var marker = this.getNativePlacemark();var map = this.map.getMap();var myOptions = {content: boxText,disableAutoPan: false,alignBottom: true,maxWidth: 0,pixelOffset: new google.maps.Size(-400,0),zIndex: null,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"},closeBoxURL: "close.gif",infoBoxClearance: new google.maps.Size(1, 1),isHidden: false,pane: "floatPane"};var ib = new InfoBox(myOptions); ib.open(map, marker, myOptions); }}},
		 
		 {start : "1931",  point : { lat : 34.672306900000, lon : -86.03414630000  },title : "Scottsboro Case", options : {theme: SBANtheme, description:"", openInfoWindow: function(){ var boxText = "<div >After a fight between black and white hobos in Scottsboro, nine black youths were falsely accused of rape. The Alabama trial captured national attention, especially after the defendants were found guilty and sentenced to death. The following year the case was overturned by the Supreme Court, evidence of a growing federal interest in protecting Southern blacks. </div>";var description = this.opts.description; var marker = this.getNativePlacemark();var map = this.map.getMap();var myOptions = {content: boxText,disableAutoPan: false,alignBottom: true,maxWidth: 0,pixelOffset: new google.maps.Size(-400,0),zIndex: null,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"},closeBoxURL: "close.gif",infoBoxClearance: new google.maps.Size(1, 1),isHidden: false,pane: "floatPane"};var ib = new InfoBox(myOptions); ib.open(map, marker, myOptions); }}},
		 
		 {start : "1936",  point : { lat : 32.803282, lon : -96.778564 },title : "Jesse Owens ", options : {theme: SBANtheme_invisible, description:"", openInfoWindow: function(){ var boxText = "<div >At the Berlin Olympics, black athlete Jesse Owens won four gold medals for the U.S., upsetting the racist assumptions of Hitler and white supremacists at home. A ticker-tape parade in New York City illustrated a growing national support for blacks. </div>";var description = this.opts.description; var marker = this.getNativePlacemark();var map = this.map.getMap();var myOptions = {content: boxText,disableAutoPan: false,alignBottom: true,maxWidth: 0,pixelOffset: new google.maps.Size(-400,0),zIndex: null,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"},closeBoxURL: "close.gif",infoBoxClearance: new google.maps.Size(1, 1),isHidden: false,pane: "floatPane"};var ib = new InfoBox(myOptions); ib.open(map, marker, myOptions); }}},
		 
		 {start : "1937",  point : { lat : 41.8781136, lon : -87.6297982 }, title : "Joe Louis wins Heavyweight Title", options : {theme: SBANtheme, description:"", openInfoWindow: function(){ var boxText = "<div >Boxer Joe Louis fought James Braddock for the World heavyweight title, and knocked him out in the eighth round. Louis' hard work and clean-cut personality made him popular with white audiences, and his rise to champion inspired many African-Americans. </div>";var description = this.opts.description; var marker = this.getNativePlacemark();var map = this.map.getMap();var myOptions = {content: boxText,disableAutoPan: false,alignBottom: true,maxWidth: 0,pixelOffset: new google.maps.Size(-400,0),zIndex: null,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"},closeBoxURL: "close.gif",infoBoxClearance: new google.maps.Size(1, 1),isHidden: false,pane: "floatPane"};var ib = new InfoBox(myOptions); ib.open(map, marker, myOptions); }}},
		 
		 {start : "1939", point : { lat : 38.8951118, lon : -77.0363658 }, title : "Lincoln Memorial Concert", options : {theme: SBANtheme, description:"", openInfoWindow: function(){ var boxText = "<div >After singer Marian Anderson was prohibited from performing at Constitution Hall because of her race, and prevented from booking other locations for the same reason, First Lady Eleanor Roosevelt helps coordinate moving the performance to the Lincoln Memorial.[18]  Wikipedia.</div>";var description = this.opts.description; var marker = this.getNativePlacemark();var map = this.map.getMap();var myOptions = {content: boxText,disableAutoPan: false,alignBottom: true,maxWidth: 0,pixelOffset: new google.maps.Size(-400,0),zIndex: null,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"},closeBoxURL: "close.gif",infoBoxClearance: new google.maps.Size(1, 1),isHidden: false,pane: "floatPane"};var ib = new InfoBox(myOptions); ib.open(map, marker, myOptions); }}},
		 
		 
		 {start : "1939",
									 point : { lat : 34.0928092, lon : -118.3286614 },
		                             title : "Hattie McDaniel wins Academy Award", 
									   options : {
									   theme: SBANtheme,
									   description:"",
									   openInfoWindow: function() { 
										var boxText = "<div id='contentleft'>For her performance as a sassy but loyal house slave in Gone With the Wind, Hattie McDaniel won the first Academy Award given to an African American actor. A technical masterpiece and blockbuster, the movie highly influenced public perceptions of southern antebellum life, the civil war, and Reconstruction.</div><div id='contentright'><iframe width='330' height='248' src='http://www.youtube.com/embed/8g8YZA2FioQ' frameborder='0' allowfullscreen></iframe></div>";
										;var description = this.opts.description;
										var marker = this.getNativePlacemark(); // in timemap.js 1.x: this.placemark
										var map = this.map.getMap();
										var myOptions = {
										 content: boxText
										,disableAutoPan: false
										,alignBottom: true
										,maxWidth: 0
										,pixelOffset: new google.maps.Size(-400,0),zIndex: null,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"},closeBoxURL: "close.gif",infoBoxClearance: new google.maps.Size(1, 1),isHidden: false,pane: "floatPane"};var ib = new InfoBox(myOptions); ib.open(map, marker, myOptions); }}},
									
		 
		 
		 {start : "1940", end : "1949",  point : { lat : 32.803282, lon : -96.778564 }, title : "Life in the 1940s", options : {theme: SBANtheme_invisible, description:"", openInfoWindow: function(){ var boxText = "<div >As Americans prepared for War, manufacturing investments stimulated the economy, finally ending the Great Depression. When the U.S. entered the World War II in 1941, new factory jobs and a labor shortage caused by workers enlisting created new opportunities for blacks and women. Old racisms and discriminatory hiring practices continued, though President Roosevelt required defense industries to open jobs to blacks. After the war, returning soldiers reclaimed these jobs, but the post-war suburban and housing boom created more economic opportunity for everyone, and spurred the second wave of the Great Migration. In 1948, the military began desegregatation, and broader support for equal rights began to grow. </div>";var description = this.opts.description; var marker = this.getNativePlacemark();var map = this.map.getMap();var myOptions = {content: boxText,disableAutoPan: false,alignBottom: true,maxWidth: 0,pixelOffset: new google.maps.Size(-400,0),zIndex: null,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"},closeBoxURL: "close.gif",infoBoxClearance: new google.maps.Size(1, 1),isHidden: false,pane: "floatPane"};var ib = new InfoBox(myOptions); ib.open(map, marker, myOptions); }}},
		 
		 {start : "1940",  point : { lat : 32.803282, lon : -96.778564 }, title : "Abolish Peonage Committee ", options : {theme: SBANtheme_invisible, description:"", openInfoWindow: function(){ var boxText = "<div >With the help of the International Labor Defense (ILD), a group of people in New York and Chicago organized the Abolish Peonage Committee and began to pressure the Justice Department to try cases.[19]         [19]  SOS, p. 176.  </div>";var description = this.opts.description; var marker = this.getNativePlacemark();var map = this.map.getMap();var myOptions = {content: boxText,disableAutoPan: false,alignBottom: true,maxWidth: 0,pixelOffset: new google.maps.Size(-400,0),zIndex: null,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"},closeBoxURL: "close.gif",infoBoxClearance: new google.maps.Size(1, 1),isHidden: false,pane: "floatPane"};var ib = new InfoBox(myOptions); ib.open(map, marker, myOptions); }}},
		 
		 {start : "1941",   point : { lat : 32.803282, lon : -96.778564 },title : "Biddle Circular No. 3591", options : {theme: SBANtheme_invisible, description:"", openInfoWindow: function(){ var boxText = "<div > <iframe id='partnerPlayer' frameborder='0' marginwidth='0' marginheight='0' scrolling='no' style='width:256px; height:144px; margin-left: 5px' src='http://video.pbs.org/widget/partnerplayer/2179141936/?w=256&amp;h=144&amp;chapterbar=False&amp;autoplay=False' align='right'></iframe>In response to the outbreak of World War II, and fears that racial inequalities would be used as anti-United States propaganda, the Attorney General Francis Biddle issued Circular No. 3591 to all federal prosecutors, instructing them to actively investigate and try more peonage cases.[20]      [20]  SBAN, p. 378-381.  </div>";var description = this.opts.description; var marker = this.getNativePlacemark();var map = this.map.getMap();var myOptions = {content: boxText,disableAutoPan: false,alignBottom: true,maxWidth: 0,pixelOffset: new google.maps.Size(-400,0),zIndex: null,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"},closeBoxURL: "close.gif",infoBoxClearance: new google.maps.Size(1, 1),isHidden: false,pane: "floatPane"};var ib = new InfoBox(myOptions); ib.open(map, marker, myOptions); }}},
		 
		 {start : "1941",end : "1945",  point : { lat : 32.803282, lon : -96.778564 }, title : "World War II", options : {theme: SBANtheme_invisible, description:"", openInfoWindow: function(){ var boxText = "<div >More than a million African Americans serve in WWII in segregated units. Though most were confined to service branches, approximately 50,000 fought in combat. The Tuskegee Airmen were particularly celebrated for their valor.  </div>";var description = this.opts.description; var marker = this.getNativePlacemark();var map = this.map.getMap();var myOptions = {content: boxText,disableAutoPan: false,alignBottom: true,maxWidth: 0,pixelOffset: new google.maps.Size(-400,0),zIndex: null,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"},closeBoxURL: "close.gif",infoBoxClearance: new google.maps.Size(1, 1),isHidden: false,pane: "floatPane"};var ib = new InfoBox(myOptions); ib.open(map, marker, myOptions); }}},
		 
		 {start : "1942", point : { lat : 33.740177, lon : -84.396973 }, title : "Georgia Contract Labor Struck Down", options : {theme: SBANtheme, description:"", openInfoWindow: function(){ var boxText = "<div >In Taylor v. Georgia, the U.S. Supreme Court struck down the Georgia contract labor law, which had forbidden a laborer from breaking a contract if he had received an advance.[21]  SOS, p. 80.  </div>";var description = this.opts.description; var marker = this.getNativePlacemark();var map = this.map.getMap();var myOptions = {content: boxText,disableAutoPan: false,alignBottom: true,maxWidth: 0,pixelOffset: new google.maps.Size(-400,0),zIndex: null,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"},closeBoxURL: "close.gif",infoBoxClearance: new google.maps.Size(1, 1),isHidden: false,pane: "floatPane"};var ib = new InfoBox(myOptions); ib.open(map, marker, myOptions); }}},
		 
		 {start : "1944", point : { lat : 33.740177, lon : -84.396973 }, title : "Florida Contract Labor Struck Down", options : {theme: SBANtheme, description:"", openInfoWindow: function(){ var boxText = "<div >In Pollock v. Williams, the U.S. Supreme Court struck down Florida's second contract labor law from 1919.[22] SOS, p. 80.  </div>";var description = this.opts.description; var marker = this.getNativePlacemark();var map = this.map.getMap();var myOptions = {content: boxText,disableAutoPan: false,alignBottom: true,maxWidth: 0,pixelOffset: new google.maps.Size(-400,0),zIndex: null,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"},closeBoxURL: "close.gif",infoBoxClearance: new google.maps.Size(1, 1),isHidden: false,pane: "floatPane"};var ib = new InfoBox(myOptions); ib.open(map, marker, myOptions); }}},
		 
		 {start : "1947",point : { lat : 32.803282, lon : -96.778564 },title : "Jackie Robinson joins Dodgers", options : {theme: SBANtheme_invisible, description:"", openInfoWindow: function(){ var boxText = "<div >Jackie Robinson becomes the first black player to join a major league baseball team, breaking the custom of segregating baseball by races. Robinson's impressive talents and steady resolve in the face of racial insults made him popular nationwide.    </div>";var description = this.opts.description; var marker = this.getNativePlacemark();var map = this.map.getMap();var myOptions = {content: boxText,disableAutoPan: false,alignBottom: true,maxWidth: 0,pixelOffset: new google.maps.Size(-400,0),zIndex: null,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"},closeBoxURL: "close.gif",infoBoxClearance: new google.maps.Size(1, 1),isHidden: false,pane: "floatPane"};var ib = new InfoBox(myOptions); ib.open(map, marker, myOptions); }}},
		 
		 {start : "1948", point : { lat : 32.803282, lon : -96.778564 }, title : "Anti-Peonage Laws Strengthened", options : {theme: SBANtheme_invisible, description:"", openInfoWindow: function(){ var boxText = "<div >Three U.S. Codes are revised to strengthen laws forbidding forced labor: the peonage statute, the slave-kidnapping law, and the involuntary servitude law.[23]  SOS, p. 186.  </div>";var description = this.opts.description; var marker = this.getNativePlacemark();var map = this.map.getMap();var myOptions = {content: boxText,disableAutoPan: false,alignBottom: true,maxWidth: 0,pixelOffset: new google.maps.Size(-400,0),zIndex: null,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"},closeBoxURL: "close.gif",infoBoxClearance: new google.maps.Size(1, 1),isHidden: false,pane: "floatPane"};var ib = new InfoBox(myOptions); ib.open(map, marker, myOptions); }}},
		 
		 {start : "1948", point : { lat : 32.803282, lon : -96.778564 }, title : "Military begins desegregation ", options : {theme: SBANtheme_invisible, description:"", openInfoWindow: function(){ var boxText = "<div >After years of promises, the federal government finally desegregated the military, allowing black soldiers full access to higher-status combat positions, and symbolically signifying the federal government's commitment to fair and equal treatment. </div>";var description = this.opts.description; var marker = this.getNativePlacemark();var map = this.map.getMap();var myOptions = {content: boxText,disableAutoPan: false,alignBottom: true,maxWidth: 0,pixelOffset: new google.maps.Size(-400,0),zIndex: null,boxStyle: {border: "1px solid black", width: "800px", background: "#FFF", padding:"5px"},closeBoxURL: "close.gif",infoBoxClearance: new google.maps.Size(1, 1),isHidden: false,pane: "floatPane"};var ib = new InfoBox(myOptions); ib.open(map, marker, myOptions); }}},
		                      

        

                    ]
					
                }
				
            }

        ],

 bandInfo: [ 
            { 
               width:          "100%", 
               intervalUnit:   Timeline.DateTime.YEAR, 
               intervalPixels: 65
            }
           
       ]
 


  });

 // set the map to our custom style
    var gmap = tm.getNativeMap();
    gmap.mapTypes.set("black", styledMapType);
    gmap.setMapTypeId("black");


});
