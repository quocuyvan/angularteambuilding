import { Injectable, OnInit } from '@angular/core';
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
import collection from 'ol/Collection';
import styleRegularShape from 'ol/style/RegularShape';
import geomMultiPoint from 'ol/geom/MultiPoint';
import Feature from 'ol/Feature';
import geomLineString from 'ol/geom/LineString';
import geomPolygon from 'ol/geom/Polygon';
import { StationService } from './station.service';
import { Station } from '../models/station';
import { CookieService } from 'ngx-cookie-service';
import { TeamService } from './team.service';
import { Team } from '../models/team';
import { element } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class PlacemarkolmapService {
  layers: layerTile;
  ordermap: Map;
  sLayer: layerVector;
  search: SearchNominatim;
  placemark: Placemark;
  placemark1: Placemark;
  placemark2: Placemark;
  placemark3: Placemark;
  placemark4: Placemark;
  placemarks: Placemark[] = [];

  team: Team = { id: null } as Team;
  station: Station = { id: null } as Station;
  stationCoor = [];
  coorArr = [];

  constructor(private stationService: StationService, private cookieService: CookieService, private teamService: TeamService) { }



  initPlacemarks(stationssum) {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < stationssum.length; i++)
    {
      let placemark = new Placemark({
        // color: '#369',
        // backgroundColor : 'yellow',
        contentColor: '#000',
        onshow(){ console.log('You opened a placemark'); },
        autoPan: true,
        autoPanAnimation: { duration: 250 }
      });
      this.placemarks.push(placemark);
    }
  }

  async initordermap(stationssum) {
        for (let i = 0; i < stationssum.length; i++)
    {
      await this.stationService.get(stationssum[i]).toPromise().then(res => {
        this.coorArr.push(res.location.split(",").map(Number));
        // if (i === stationssum.length - 1) 
        // {
        //   console.log(this.coorArr);
        //   // console.log(this.coorArr[0]); 
        //   this.loadordermap(stationssum);
        // }
      });
    }
  }

  async loadordermap(stationssum) {
    this.initPlacemarks(stationssum);
    await this.initordermap(stationssum);
    console.log(this.coorArr);
    this.layers = [new layerTile({ source: new sourceOSM() })];

    this.ordermap = new Map
      ({	target: 'map',
        view: new View
        ({	zoom: 17,
          // center: [11885770.02422427, 1215091.909400785],
          // center: [11885676.215188004, 1215066.7199131292],
          center: this.coorArr[0],
        }),
        interactions: defaultInteractions({ altShiftDragRotate: false, pinchRotate: false }),
        layers: this.layers,
        overlays: this.placemarks,
      });

    this.ordermap.once('postrender', (e) => {
      //this.placemark.show(e.coordinate);
      // this.placemark1.show([11885770.02422427, 1215091.909400785], '1');
      for (let i = 0; i < this.placemarks.length;i++)
      {
        this.placemarks[i].show(this.coorArr[i],i+1);
      }
    });

    // let corArr = [[11885770.02422427, 1215091.909400785],[11885676.215188004, 1215066.7199131292],[11885703.638683962, 1215249.671853247]]
    //placemarks: Placemark[] = [];

    // 5ea869f414e7ea58ac119a73,5ea869f514e7ea58ac119a74,5eb026274eec902a88caa8f9,5eb02ce54eec902a88caa901
    // let stations = '5ea869f414e7ea58ac119a73,5ea869f514e7ea58ac119a74,5eb026274eec902a88caa8f9,5eb02ce54eec902a88caa901';
    // this.stationsArr.push(stations.split(","));
    // console.log(this.stationsArr[0])
    // console.log(this.stationsArr[0].length)
    // let corArr = [];
    // corArr.push(this.testtring1.split(",").map(Number));
    // console.log(corArr);
    // for (let i=0; i<this.placemarks.length;i++)
    // {
    //   this.placemarks[i].show(corArr[i],i+1);
    // }

    // this.placemark2.show([this.placemarks[0]], '1');
    // this.placemark3.show([this.placemarks[1]], '2');
    // this.placemark4.show([this.placemarks[2]], '3');


    var vector = new layerVector(
      {	name: 'Vecteur',
        source: new sourceVector({ features: new collection() }),
        style: function(f) 
        {	return [
            new styleStyle({
              stroke: new styleStroke({ color: '#ffcc33',width: 2 }),
            }),
            new styleStyle({
              image: new styleRegularShape({ radius: 4, points:4, fill: new styleFill({ color: '#f00' }) }),
              geometry: new geomMultiPoint([f.getGeometry().getFirstCoordinate(),f.getGeometry().getLastCoordinate()])
            })
          ]
        }
      })
    this.ordermap.addLayer(vector);
    // vector.getSource().addFeature(new Feature(new geomLineString([[11885770.02422427, 1215091.909400785],
    //    [11885676.215188004, 1215066.7199131292], [11885703.638683962, 1215249.671853247]])));
    vector.getSource().addFeature(new Feature(new geomLineString(this.coorArr)));

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
    this.ordermap.addLayer(this.sLayer);

    this.search = new SearchNominatim (
      {	// target: $(".options").get(0),
        polygon: $('#polygon').prop('checked'),
        reverse: true,
        position: true	// Search, with priority to geo position
      });
    this.ordermap.addControl (this.search);

    this.search.on('select', (e) =>
      {	// console.log(e);
        this.sLayer.getSource().clear();
        // Check if we get a geojson to describe the search
        if (e.search.geojson) {
          const format = new GeoJSON();
          // tslint:disable-next-line: max-line-length
          const f = format.readFeature(e.search.geojson, { dataProjection: 'EPSG:4326', featureProjection: this.ordermap.getView().getProjection() });
          this.sLayer.getSource().addFeature(f);
          const view = this.ordermap.getView();
          const resolution = view.getResolutionForExtent(f.getGeometry().getExtent(), this.ordermap.getSize());
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
          this.ordermap.getView().animate({
            center: e.coordinate,
            zoom: Math.max (this.ordermap.getView().getZoom(), 16)
          });
        }
      });
  }

}