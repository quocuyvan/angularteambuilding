import { Injectable } from '@angular/core';
import layerTile from 'ol/layer/Tile';
import sourceOSM from 'ol/source/OSM';
import Map from 'ol/Map';
import View from 'ol/View';
import {defaults as defaultInteractions} from 'ol/interaction';
import layerVector from 'ol/layer/Vector';
import sourceVector from 'ol/source/Vector';
import styleStyle from 'ol/style/Style';
import styleCircle from 'ol/style/Circle';
import styleStroke from 'ol/style/Stroke';
import styleFill from 'ol/style/Fill';
import SearchNominatim from 'ol-ext/control/SearchNominatim';
import GeoJSON from 'ol/format/GeoJSON';
import {getCenter as getCenterExtent} from 'ol/extent';
import * as $ from 'jquery';
import Placemark from 'ol-ext/Overlay/Placemark';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class OlmapService {
  layers: layerTile;
  map: Map;
  sLayer: layerVector;
  search: SearchNominatim;
  placemark: Placemark;

  constructor(private cookieService: CookieService) { }
  show() {
    this.layers = [new layerTile({ source: new sourceOSM() })];

    this.placemark = new Placemark({
      // color: '#369',
      // backgroundColor : 'yellow',
      contentColor: '#000',
      onshow(){ console.log('You opened a placemark'); },
      autoPan: true,
      autoPanAnimation: { duration: 250 }
    });

    this.map = new Map
      ({
        target: 'map',
        view: new View
        ({	zoom: 5,
          center: [11885770.02422427, 1215091.909400785]
        }),
        interactions: defaultInteractions({ altShiftDragRotate: false, pinchRotate: false }),
        layers: this.layers,
        overlays: [this.placemark]
      });

    this.map.on('click', (e) => {
      this.placemark.show(e.coordinate);
      console.log(e.coordinate);
      this.cookieService.set('locationCoor', e.coordinate);
    });

    this.sLayer = new layerVector({
        source: new sourceVector(),
        style: new styleStyle({
          image: new styleCircle({
            radius: 5,
            stroke: new styleStroke ({
              color: 'rgb(255,165,0)',
              width: 3
            }),
            fill: new styleFill({
              color: 'rgba(255,165,0,.3)'
            })
          }),
          stroke: new styleStroke ({
            color: 'rgb(255,165,0)',
            width: 3
          }),
          fill: new styleFill({
            color: 'rgba(255,165,0,.3)'
          })
        })
      });
    this.map.addLayer(this.sLayer);

    this.search = new SearchNominatim (
      {	// target: $(".options").get(0),
        polygon: $('#polygon').prop('checked'),
        reverse: true,
        position: true	// Search, with priority to geo position
      });
    this.map.addControl (this.search);

    this.search.on('select', (e) =>
      {	// console.log(e);
        this.sLayer.getSource().clear();
        // Check if we get a geojson to describe the search
        if (e.search.geojson) {
          const format = new GeoJSON();
          // tslint:disable-next-line: max-line-length
          const f = format.readFeature(e.search.geojson, { dataProjection: 'EPSG:4326', featureProjection: this.map.getView().getProjection() });
          this.sLayer.getSource().addFeature(f);
          const view = this.map.getView();
          const resolution = view.getResolutionForExtent(f.getGeometry().getExtent(), this.map.getSize());
          const zoom = view.getZoomForResolution(resolution);
          const center = getCenterExtent(f.getGeometry().getExtent());
          // redraw before zoom
          setTimeout(() => {
              view.animate({
              // center: center,
              zoom: Math.min (zoom, 16)
            });
          }, 100);
        }
        else {
          this.map.getView().animate({
            center: e.coordinate,
            zoom: Math.max (this.map.getView().getZoom(), 16)
          });
        }
      });
  }
}
