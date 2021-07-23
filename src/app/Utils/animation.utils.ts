import { AnimationAssets } from "./animation-assets.utils";

export class AnimationUtils {

    static animIndex: number;
    static animLoop: number;
    
    static planePath: google.maps.Polyline;
    static trailPath: google.maps.Polyline;
    static startPoint: google.maps.LatLng;
    static endPoint: google.maps.LatLng;
    static map: google.maps.Map;
    
    public static animateFlight(start: Array<any>, end: Array<any>, map: google.maps.Map) {
        
        this.map = map;
        // Convert the points arrays into Lat / Lng objects
        this.startPoint = new google.maps.LatLng(start[0], start[1]);
        this.endPoint = new google.maps.LatLng(end[0], end[1]);

        // Create a polyline for the planes path
        this.planePath = new google.maps.Polyline({
            path: [this.startPoint, this.endPoint],
            strokeColor: '#0f0',
            strokeWeight: 0,
            icons: [{
                icon: AnimationAssets.getPlaneSymbol(),
                offset: '0%'
            }],
            map: this.map,
            geodesic: true
        });
        this.trailPath = new google.maps.Polyline({
            path: [this.startPoint, this.endPoint],
            strokeColor: '#2eacd0',
            strokeWeight: 2,
            map: map,
            geodesic: true
        });

        this.tick( );
        // window.requestAnimationFrame(() => {
        //     this.tick(startPoint, endPoint, map);
        // });

       

        // this.animLoop = window.requestAnimationFrame( () => {
        //     // this.tick(startPoint, endPoint, map);
                
        // });
    }

    public static tick( ) {

        this.animIndex += 0.2;
        // Draw trail
        var nextPoint = google.maps.geometry.spherical.interpolate(this.startPoint, this.endPoint, this.animIndex / 100);
        this.trailPath.setPath([this.startPoint, nextPoint]);

        // Move the plane
        this.planePath.setOptions({
            icons: [{
                icon: AnimationAssets.getPlaneSymbol(),
                offset: Math.min(this.animIndex, 100) + '%'
            }]
        })
        this.planePath.setPath(this.planePath.getPath());

        if (this.animIndex >= 100) {
            window.cancelAnimationFrame(this.animLoop);
            this.animIndex = 0;
            this.trailPath.setVisible(false);
            this.planePath.setVisible(false);

        } else {
            this.animLoop = window.requestAnimationFrame(() => {
                this.tick( );
            });
        }


    }
    public static test() {



    }
    // public static tick(startPoint: google.maps.LatLng, endPoint: google.maps.LatLng) {
    //     throw new Error("Function not implemented.");
    // }
}



