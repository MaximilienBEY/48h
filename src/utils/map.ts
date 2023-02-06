import * as turf from "@turf/turf"
import { Feature, FeatureCollection, MultiPoint, Polygon } from "geojson"
import {
  LngLat,
  Map,
  MapLayerEventType,
  MapLayerMouseEvent,
  Marker,
  Popup,
} from "mapbox-gl"

import {
  BackofficeParcelType,
  Read as ParcelRead,
} from "../client-logistique/typescript/src/types/parcelle"
import { TelepiloteRead } from "../client-logistique/typescript/src/types/user"
import { MapState, PilotCallback, RoundData, RoundRead } from "../contexts/map"
import { getJson } from "./basic"

type PilotMarker = {
  marker: Marker
  onClick: (callback: () => void) => void
  enableBig: () => void
  disableBig: () => void
  changeColor: (color: MarkerColor) => void
}
type MarkerType = "pilot" | "plant"
type MarkerColor = "blue" | "black" | "red" | "yellow"

export const stringifyEntrypoint = (entryPoint?: {
  latitude: number
  longitude: number
}) => {
  if (!entryPoint) return "Pas de point d'entré"

  const latitude = Math.round(entryPoint.latitude * 1000000) / 1000000
  const longitude = Math.round(entryPoint.longitude * 1000000) / 1000000
  return `${latitude}, ${longitude}`
}
const getMarkerElement = (type: MarkerType, color: MarkerColor) => {
  const element = document.createElement("div")
  element.className = `marker ${color}`

  element.innerHTML = `<svg width="30" height="40" viewBox="0 0 30 40" fill="none" version="1.1" id="svg36" sodipodi:docname="1.svg"
  xml:space="preserve" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
  xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns="http://www.w3.org/2000/svg"
  xmlns:svg="http://www.w3.org/2000/svg">
  <path
    d="M 15.0002,0 C 6.71593,-1.81808e-4 6.94363e-5,6.63554 0,14.8212 -1.73585e-4,23.0071 15.0002,40 15.0002,40 c 0,0 15,-16.9931 14.9998,-25.1788 C 29.9999,6.63573 23.2844,6.77544e-5 15.0002,0 Z"
    fill="#2b3c4d" id="path30" class="fill"/>
  ${
    type === "pilot"
      ? `
  <g id="g897" style="display:inline" inkscape:label="pilot">
    <path
      d="M 15.0002,6.45166 C 12.3835,6.48443 8.17069,9.11769 7.71391,9.40809 7.68536,9.42624 7.65683,9.44354 7.62757,9.46051 1.91538,12.7744 3.4974,15.1715 4.82534,16.2514 c 0.56527,0.4597 1.36336,0.3797 2.03345,0.0937 1.29693,-0.5537 3.87621,-1.3302 8.14141,-1.3302 4.2651,0 6.8443,0.7765 8.1412,1.3302 0.6701,0.286 1.4682,0.366 2.0335,-0.0937 1.3279,-1.0799 2.9099,-3.477 -2.8022,-6.79088 C 22.3434,9.44354 22.3149,9.42623 22.2863,9.40808 21.8295,9.11765 17.6168,6.48443 15.0002,6.45166 Z M 10.4366,10.4643 C 10.2817,9.69588 11.3118,9.44912 12.0535,9.70245 l 2.3003,0.78555 c 0.419,0.1431 0.8737,0.1431 1.2928,0 l 2.3001,-0.78554 c 0.7418,-0.25334 1.7718,-0.00658 1.617,0.76184 -0.0786,0.39 -0.4126,0.8059 -1.2915,1.1272 -1.6966,0.6203 -2.7332,1.1043 -3.1536,1.3117 -0.0146,0.0072 -0.0231,0.0222 -0.0224,0.0385 0.0014,0.0319 -0.0325,0.0534 -0.0609,0.0388 -0.0041,-0.0021 -0.0083,-0.0043 -0.0128,-0.0066 -0.014,-0.0072 -0.0307,-0.0072 -0.0447,0 -0.0044,0.0023 -0.0087,0.0045 -0.0128,0.0066 -0.0283,0.0146 -0.0622,-0.007 -0.0609,-0.0388 7e-4,-0.0163 -0.0078,-0.0313 -0.0224,-0.0385 -0.4203,-0.2074 -1.457,-0.6913 -3.1537,-1.3117 -0.8789,-0.3213 -1.2129,-0.7372 -1.2914,-1.1272 z"
      fill="#ffffff" id="path32" />
    <path
      d="m 14.9998,16.0544 c -3.687,0.064 -5.98154,0.8168 -7.13126,1.3325 -0.58635,0.263 -0.90863,0.8727 -0.69975,1.4804 0.48557,1.4127 2.1469,3.8141 7.83101,3.71 5.684,0.1041 7.3453,-2.2973 7.8309,-3.71 0.2089,-0.6077 -0.1134,-1.2174 -0.6997,-1.4804 -1.1497,-0.5157 -3.4442,-1.2685 -7.1312,-1.3325 z"
      fill="#ffffff" id="path34" />
  </g>`
      : `
  <g style="display:inline;fill:none" id="g338" transform="translate(5.3857867,7.775399)" inkscape:label="plant">
    <path
      d="M 11.0252,7.23188 C 10.9771,0.159802 7.39112,0.0282006 0.043457,0.222068 0.0574383,7.36242 4.69668,7.49032 11.0252,7.23188 Z"
      fill="#ffffff" id="path323" />
    <path
      d="M 9.37793,12.1784 C 9.42131,6.73833 12.6486,6.63712 19.2615,6.78624 19.249,12.2788 15.0736,12.3772 9.37793,12.1784 Z"
      fill="#ffffff" id="path325" />
    <path
      d="m 9.92728,5.1084 c 0.60842,0 1.09822,0.46512 1.09822,1.04288 v 9.96732 c 0,0.5777 -0.4898,1.0429 -1.09822,1.0429 -0.60839,0 -1.09818,-0.4652 -1.09818,-1.0429 V 6.15128 c 0,-0.57776 0.48979,-1.04288 1.09818,-1.04288 z"
      fill="#ffffff" id="path327" />
  </g>`
  }
</svg>`

  return element
}

const events: [string, keyof MapLayerEventType, (e: any) => void, string | undefined][] =
  []
const markers: [string, Marker][] = []

const unionFeatures = <F extends Feature<Polygon>>(features: F[]): F => {
  if (features.length === 1) return features[0]
  let feature = turf.union(features[0], features[1]) ?? features[0]
  features.slice(2).map((f) => (feature = turf.union(feature, f) ?? feature))

  return feature as F
}
const addEvent = <T extends keyof MapLayerEventType>(
  id: string,
  map: Map,
  type: T,
  callback: (e: MapLayerEventType[T]) => void,
  layer?: string,
) => {
  events.push([id, type, callback, layer])
  layer ? map.on(type, layer, callback) : map.on(type, callback)
}
const removeEvent = <T extends keyof MapLayerEventType>(
  { id, map }: MapState,
  type: T,
  layer?: string,
) => {
  const evt = events.find(
    ([mapId, eventType, _, eventLayer]) =>
      mapId === id && eventType === type && eventLayer === layer,
  )
  if (!evt) return
  const [_, t, callback, l] = evt
  if (l) map.off(t, l, callback)
  else map.off(t, callback)
  events.splice(events.indexOf(evt), 1)
}
const inside = (collection: FeatureCollection<Polygon>, e: MapLayerMouseEvent) =>
  turf.inside([e.lngLat.lng, e.lngLat.lat], collection.features[0])

export const resetMap = ({ id, map, layers }: MapState) => {
  events
    .filter((evt) => evt[0] === id)
    .map((evt) => {
      const [_, type, callback, layer] = evt
      if (layer) map.off(type, layer, callback)
      else map.off(type, callback)
      events.splice(events.indexOf(evt), 1)
    })
  layers.map((layer) => {
    if (map.getLayer(layer)) map.removeLayer(layer)
    if (map.getLayer(`${layer}-border`)) map.removeLayer(`${layer}-border`)
    if (map.getLayer(`${layer}-fill`)) map.removeLayer(`${layer}-fill`)
    if (map.getSource(layer)) map.removeSource(layer)
  })
  markers
    .filter(([mapId]) => id === mapId)
    .map((m) => {
      const [_, marker] = m
      marker.remove()
      markers.splice(markers.indexOf(m), 1)
    })
}
export const addParcels = async (
  { id, map, layers }: MapState,
  parcels: ParcelRead[],
  toggleOptions: (parcel: ParcelRead, element: HTMLElement) => void,
) => {
  const data = await Promise.all(
    parcels.map(async (parcel) => {
      const geojson = getJson<FeatureCollection<Polygon>>(parcel.geoJson)
      if (!geojson) return null

      const entryPoint = (
        parcel.entryPoint
          ? [parcel.entryPoint.longitude, parcel.entryPoint.latitude]
          : turf.center(geojson).geometry.coordinates
      ) as [number, number]
      const marker = new Marker({
        color: "#2B3C4D",
      })
        .setLngLat(entryPoint)
        .addTo(map)
      markers.push([id, marker])
      return { parcel, geojson, entryPoint, marker }
    }),
  ).then(
    (data) =>
      data.filter((f) => !!f) as {
        parcel: ParcelRead
        geojson: FeatureCollection<Polygon>
        entryPoint: [number, number]
        marker: Marker
      }[],
  )
  const geojsons = data.map((d) => d.geojson)
  if (!data.length) return

  const features = geojsons.map((geojson) => geojson.features).flat()
  const geojson = unionFeatures(features)
  const bounds = turf.bbox(geojson) as [number, number, number, number]

  layers.push("parcels")
  map.addSource("parcels", {
    type: "geojson",
    data: geojson,
  })
  map.addLayer({
    id: "parcels-fill",
    type: "fill",
    source: "parcels",
    paint: {
      "fill-color": "#2B3C4D",
      "fill-opacity": 0.25,
    },
  })
  map.addLayer({
    id: "parcels-border",
    type: "line",
    source: "parcels",
    paint: {
      "line-color": "#2B3C4D",
      "line-opacity": 0.75,
      "line-width": 3,
    },
  })

  const popup = new Popup({ closeButton: false, closeOnClick: false })
  addEvent(id, map, "mousemove", (e) => {
    const d = data.find(({ geojson }) => inside(geojson, e))
    if (!d) return popup.remove()

    const center = turf.center(d.geojson).geometry.coordinates as [number, number]
    popup.setLngLat(center).setHTML(d.parcel.name).addTo(map)

    const element = popup.getElement()
    element.style.cursor = "pointer"
    element.style.userSelect = "none"

    element.addEventListener("click", () =>
      toggleOptions(d.parcel, d.marker.getElement()),
    )
  })
  addEvent(id, map, "mouseleave", () => popup.remove())

  map.fitBounds(bounds, { padding: 8, animate: false })
}

export const showParcel = async ({ id, map, layers }: MapState, parcel: ParcelRead) => {
  if (map.getSource("parcel")) return

  const geojson = getJson<FeatureCollection<Polygon>>(parcel.geoJson)
  if (!geojson) return

  const entryPoint = (
    parcel.entryPoint ? [parcel.entryPoint.longitude, parcel.entryPoint.latitude] : null
  ) as [number, number]
  if (entryPoint) {
    const marker = new Marker({
      color: "#2B3C4D",
    })
      .setLngLat(entryPoint)
      .addTo(map)
    markers.push([id, marker])
  }

  const bounds = turf.bbox(geojson) as [number, number, number, number]
  layers.push("parcel")
  map.addSource("parcel", {
    type: "geojson",
    data: geojson,
  })
  map.addLayer({
    id: "parcel-fill",
    type: "fill",
    source: "parcel",
    paint: {
      "fill-color": "#2B3C4D",
      "fill-opacity": 0.25,
    },
  })
  map.addLayer({
    id: "parcel-border",
    type: "line",
    source: "parcel",
    paint: {
      "line-color": "#2B3C4D",
      "line-opacity": 0.75,
      "line-width": 3,
    },
  })

  map.fitBounds(bounds, { padding: 128, animate: false })
}
export const handleEntryPoint = async (mapData: MapState) => {
  const { id, map } = mapData
  let point = markers.find(([mapId]) => id === mapId)?.[1]
  const hadPoint = !!point

  if (point) point.getElement().dataset.entryPoint = point.getLngLat().toArray().join(",")

  return new Promise<[number, number] | null>((resolve) => {
    const timeout = setTimeout(() => resolve(null), 60 * 1000)
    let lngLat: LngLat | null = null

    addEvent(id, map, "mousemove", (e) => {
      lngLat = e.lngLat
      if (!point) point = new Marker({ color: "#2B3C4D" }).setLngLat(lngLat).addTo(map)
      point?.setLngLat(lngLat)
    })
    addEvent(id, map, "click", (e) => {
      removeEvent(mapData, "click")
      removeEvent(mapData, "mousemove")
      clearTimeout(timeout)
      resolve([e.lngLat.lng, e.lngLat.lat])

      if (!hadPoint && point) markers.push([id, point])
    })
  })
}
export const cancelEntryPoint = (mapData: MapState) => {
  const point = markers.find(([mapId]) => mapData.id === mapId)?.[1]

  if (point) {
    const entryPoint = point
      .getElement()
      .dataset.entryPoint?.split(",")
      .map((p) => parseFloat(p)) as [number, number] | undefined
    if (!entryPoint) {
      point.remove()
      const index = markers.findIndex((m) => m[0] === mapData.id && m[1] === point)
      markers.splice(index, 1)
    } else {
      point.setLngLat(entryPoint)
    }
  }
  removeEvent(mapData, "click")
  removeEvent(mapData, "mousemove")
}

const getMarker = (
  id: string,
  map: Map,
  {
    type,
    color,
    lngLat,
    defaultBig,
    label,
  }: {
    type: MarkerType
    color: MarkerColor
    lngLat: [number, number]
    defaultBig?: boolean
    label?: string
  },
): PilotMarker => {
  const marker = new Marker(getMarkerElement(type, color)).setLngLat(lngLat).addTo(map)
  if (defaultBig) marker.getElement().classList.add("big")
  if (label) {
    const popup = new Popup({ closeButton: false, closeOnClick: false }).setHTML(
      `<div class="map-popup">${label}</div>`,
    )
    marker.setPopup(popup)
    marker.getElement().addEventListener("mouseenter", () => marker.togglePopup())
    marker.getElement().addEventListener("mouseleave", () => marker.togglePopup())
  }
  markers.push([id, marker])

  const enableBig = () => marker.getElement().classList.add("big")
  const disableBig = () => marker.getElement().classList.remove("big")
  const changeColor = (color: MarkerColor) => {
    marker.getElement().classList.remove("blue", "red", "black")
    marker.getElement().classList.add(color)
  }
  const onClick = (callback: () => void) =>
    marker.getElement().addEventListener("click", (e) => {
      e.stopPropagation()
      callback()
    })

  return {
    marker,
    onClick,
    enableBig,
    disableBig,
    changeColor,
  }
}
export const editPilots = (
  { id, map }: MapState,
  parcels: BackofficeParcelType[],
  pilots: TelepiloteRead[],
  callback: PilotCallback,
) => {
  pilots.map((pilot, index, self) => {
    if (
      !self
        .slice(index + 1)
        .find(
          (p) =>
            p.coordinates.longitude === pilot.coordinates.longitude &&
            p.coordinates.latitude === pilot.coordinates.latitude,
        )
    )
      return
    pilot.coordinates.longitude += 0.001 * (index + 1)
    pilot.coordinates.latitude += 0.001 * (index + 1)
  })
  const previousPilots = parcels
    .filter((p) => p.telepilote)
    .map((parcel) => [parcel.parcel._id, parcel.telepilote] as [string, TelepiloteRead])

  parcels = parcels
    .filter((p, i, s) => s.findIndex((f) => f.parcel._id === p.parcel._id) === i)
    .map((parcel) => ({ ...parcel }))
  let activePilot = parcels
    .map((parcel) => parcel.telepilote)
    .flat()
    .find((pilot) => pilots.find((p) => p._id === pilot?._id))
  let parcelsMarker: {
    parcel: BackofficeParcelType
    marker: PilotMarker
    position: number[]
  }[] = []
  let pilotsMarker: {
    pilot: TelepiloteRead
    marker: PilotMarker
    position: number[]
  }[] = []

  const resetParcelsMarker = () => {
    parcelsMarker.map(({ parcel, marker }) => {
      if (parcel.telepilote?._id === activePilot?._id) {
        marker.enableBig()
        marker.changeColor("blue")
      } else {
        marker.disableBig()
        marker.changeColor(parcel.telepilote ? "black" : "red")
      }
    })
  }
  const resetPilotsMarker = () => {
    pilotsMarker.map(({ pilot, marker }) => {
      if (pilot._id === activePilot?._id) {
        marker.enableBig()
        marker.changeColor("blue")
      } else {
        marker.disableBig()
        marker.changeColor("black")
      }
    })
  }

  parcelsMarker = parcels.map((parcel) => {
    const position = [
      parcel.parcel.entryPoint!.longitude,
      parcel.parcel.entryPoint!.latitude,
    ]
    const marker = getMarker(id, map, {
      type: "plant",
      color:
        activePilot && parcel.telepilote?._id === activePilot._id
          ? "blue"
          : parcel.telepilote
          ? "black"
          : "red",
      lngLat: position as [number, number],
      label: parcel.parcel.name,
    })
    if (activePilot && parcel.telepilote?._id === activePilot._id) marker.enableBig()

    marker.onClick(() => {
      if (!activePilot) return

      if (parcel.telepilote?._id === activePilot?._id) {
        const previousPilot = previousPilots.find(([id]) => parcel.parcel._id === id)?.[1]
        parcel.telepilote =
          activePilot._id === previousPilot?._id ? undefined : previousPilot
        marker.disableBig()
        marker.changeColor(parcel.telepilote ? "black" : "red")
        callback("remove", parcel, activePilot)
      } else {
        parcel.telepilote = activePilot
        marker.enableBig()
        marker.changeColor("blue")
        callback("add", parcel, activePilot)
      }
    })

    return { parcel, marker, position }
  })
  pilotsMarker = pilots.map((pilot) => {
    const position = [pilot.coordinates.longitude, pilot.coordinates.latitude]
    const marker = getMarker(id, map, {
      type: "pilot",
      color: pilot._id === activePilot?._id ? "blue" : "black",
      lngLat: position as [number, number],
      label: `${pilot.firstName} ${pilot.lastName}`,
    })
    marker.onClick(() => {
      activePilot = pilot
      resetParcelsMarker()
      resetPilotsMarker()
    })

    return { pilot, marker, position }
  })

  const boundGeojson: MultiPoint = {
    type: "MultiPoint",
    coordinates: [
      ...parcelsMarker.map(({ position }) => position),
      ...pilotsMarker.map(({ position }) => position),
    ],
  }
  const parcelsBound = turf.bbox(boundGeojson) as [number, number, number, number]
  map.fitBounds(parcelsBound, { padding: 20, animate: false })
}

export const fitGeojson = ({ map }: MapState, geojson: any) => {
  const bound = turf.bbox(geojson) as [number, number, number, number]
  map.fitBounds(bound, { padding: 20, animate: false })
}

export const showPilotParcels = (
  { id, map }: MapState,
  pilot: TelepiloteRead,
  parcels: BackofficeParcelType[],
) => {
  const parcelsMarker = parcels.map((parcel) => {
    const position = [
      parcel.parcel.entryPoint!.longitude,
      parcel.parcel.entryPoint!.latitude,
    ]
    const marker = getMarker(id, map, {
      type: "plant",
      color: "blue",
      lngLat: position as [number, number],
      label: parcel.parcel.name,
    })

    return { parcel, marker, position }
  })

  const pilotPosition = [pilot.coordinates.longitude, pilot.coordinates.latitude]
  getMarker(id, map, {
    type: "pilot",
    color: "black",
    lngLat: pilotPosition as [number, number],
    defaultBig: true,
  })

  const boundGeojson: MultiPoint = {
    type: "MultiPoint",
    coordinates: [...parcelsMarker.map(({ position }) => position), pilotPosition],
  }
  const parcelsBound = turf.bbox(boundGeojson) as [number, number, number, number]
  map.fitBounds(parcelsBound, { padding: 64, animate: false })
}

export const showPilotRound = async (
  { id, map, layers }: MapState,
  pilot: TelepiloteRead,
  round: RoundRead,
) => {
  const roundGeojson = await fetch(round.routeGeoJsonUrl)
    .then((res) => res.json() as Promise<FeatureCollection>)
    .catch(() => null)

  if (!roundGeojson) return

  const pilotPosition = [pilot.coordinates.longitude, pilot.coordinates.latitude]
  getMarker(id, map, {
    type: "pilot",
    color: "black",
    lngLat: pilotPosition as [number, number],
    defaultBig: true,
  })

  round.parcels.map(({ parcel, statut }) => {
    const position = [parcel.entryPoint!.longitude, parcel.entryPoint!.latitude]
    const marker = getMarker(id, map, {
      type: "plant",
      color:
        statut === "done"
          ? "blue"
          : statut === "notDone"
          ? "yellow"
          : statut === "impossible"
          ? "red"
          : "black",
      lngLat: position as [number, number],
      label: parcel.name,
    })

    return { parcel, marker, position }
  })

  layers.push("round")
  map.addSource("round", {
    type: "geojson",
    data: roundGeojson,
  })
  map.addLayer({
    id: "round",
    type: "line",
    source: "round",
    paint: {
      "line-color": "#7B61FF",
      "line-opacity": 0.75,
      "line-width": 3,
    },
  })
  const bbox = turf.bbox(roundGeojson) as [number, number, number, number]
  map.fitBounds(bbox, { padding: 64, animate: false })

  // rounds.map((round, index, self) => {
  //   if (
  //     !round.parcel.entryPoint ||
  //     !self
  //       .slice(index + 1)
  //       .find(
  //         (p) =>
  //           p.parcel.entryPoint?.longitude === round.parcel.entryPoint?.longitude &&
  //           p.parcel.entryPoint?.latitude === round.parcel.entryPoint?.latitude,
  //       )
  //   )
  //     return
  //   round.parcel.entryPoint.longitude += 0.001 * (index + 1)
  //   round.parcel.entryPoint.latitude += 0.001 * (index + 1)
  // })

  // const roundsGeojson = await Promise.all(
  //   rounds.map(async (round) => {
  //     const geojson = await fetch(round.routeGeoJsonUrl)
  //       .then((res) => res.json() as Promise<FeatureCollection>)
  //       .catch(() => null)
  //     return geojson
  //   }),
  // )
  //   .then((geojsons) => geojsons.filter((geojson) => !!geojson) as FeatureCollection[])
  //   .then((geojsons) => geojsons.map((geojson) => geojson.features).flat())
  //   .then(
  //     (geojsons) =>
  //       featureCollection(geojsons) as GeoJSON.FeatureCollection<GeoJSON.Geometry>,
  //   )
  // const roundsMarker = rounds.map((round) => {
  //   const position = [
  //     round.parcel.entryPoint!.longitude,
  //     round.parcel.entryPoint!.latitude,
  //   ]
  //   const marker = getMarker(id, map, {
  //     type: "plant",
  //     color:
  //       round.status === "late" || round.roundStatus === "impossible"
  //         ? "red"
  //         : round.status === "ongoing" || round.roundStatus === "notDone"
  //         ? "yellow"
  //         : round.status === "validated" ||
  //           round.status === "done" ||
  //           round.roundStatus === "done"
  //         ? "blue"
  //         : "black",
  //     lngLat: position as [number, number],
  //     label: round.name,
  //   })
  //   return { round, marker, position }
  // })

  // layers.push("rounds")
  // map.addSource("rounds", {
  //   type: "geojson",
  //   data: roundsGeojson,
  // })
  // map.addLayer({
  //   id: "rounds",
  //   type: "line",
  //   source: "rounds",
  //   paint: {
  //     "line-color": "#2B3C4D",
  //     "line-opacity": 0.75,
  //     "line-width": 3,
  //   },
  // })

  // const pilotPosition = [pilot.coordinates.longitude, pilot.coordinates.latitude]
  // getMarker(id, map, {
  //   type: "pilot",
  //   color: "black",
  //   lngLat: pilotPosition as [number, number],
  //   defaultBig: true,
  // })
  // if (roundsGeojson.features.length === 0) return

  // const geojsonBbox = turf.bbox(roundsGeojson) as [number, number, number, number]
  // const boundGeojson: MultiPoint = {
  //   type: "MultiPoint",
  //   coordinates: [
  //     [geojsonBbox[0], geojsonBbox[1]],
  //     [geojsonBbox[2], geojsonBbox[3]],
  //     pilotPosition,
  //   ],
  // }

  // const bbox = turf.bbox(boundGeojson) as [number, number, number, number]
  // map.fitBounds(bbox, { padding: 64, animate: false })
}

export const showRound = (
  { id, map, layers }: MapState,
  { geojson, parcels, startPoint, endPoint }: RoundData,
) => {
  if (geojson) {
    map.addSource("round", {
      type: "geojson",
      data: geojson,
    })
    map.addLayer({
      id: "round",
      type: "line",
      source: "round",
      paint: {
        "line-color": "#7B61FF",
        "line-opacity": 0.75,
        "line-width": 3,
      },
    })
    layers.push("round")
  }
  if (parcels) {
    parcels.map((parcel) => {
      getMarker(id, map, {
        type: "plant",
        color: "blue",
        lngLat: [parcel.entryPoint!.longitude, parcel.entryPoint!.latitude],
        label: parcel.name,
      })
    })
  }
  if (startPoint) {
    const marker = new Marker({ color: "#2B3C4D" }).setLngLat(startPoint).addTo(map)
    marker.getElement().dataset.type = "start"
    markers.push([id, marker])
  }
  if (endPoint) {
    const marker = new Marker({ color: "#2B3C4D" }).setLngLat(endPoint).addTo(map)
    marker.getElement().dataset.type = "end"
    markers.push([id, marker])
  }

  if (geojson) {
    const bbox = turf.bbox(geojson) as [number, number, number, number]
    map.fitBounds(bbox, { animate: false, padding: 8 })
  } else if (startPoint && endPoint) {
    const boundGeojson: MultiPoint = {
      type: "MultiPoint",
      coordinates: [startPoint, endPoint],
    }
    const bbox = turf.bbox(boundGeojson) as [number, number, number, number]
    map.fitBounds(bbox, { animate: false, padding: 8 })
  }
}
export const handleRoundPoint = (mapData: MapState, type: "start" | "end") => {
  const { id, map } = mapData
  let marker = markers
    .filter(([mapId]) => mapId === id)
    .find((marker) => marker[1].getElement().dataset.type === type)?.[1]
  const hadMarker = !!marker

  if (marker)
    marker.getElement().dataset.entryPoint = marker.getLngLat().toArray().join(",")

  return new Promise<[number, number] | null>((resolve) => {
    const timeout = setTimeout(() => resolve(null), 60 * 1000)
    let lngLat: LngLat | null = null

    addEvent(id, map, "mousemove", (e) => {
      lngLat = e.lngLat
      if (!marker) {
        marker = new Marker({ color: "#2B3C4D" }).setLngLat(lngLat).addTo(map)
        marker.getElement().dataset.type = type
      }
      marker?.setLngLat(lngLat)
    })
    addEvent(id, map, "click", (e) => {
      removeEvent(mapData, "click")
      removeEvent(mapData, "mousemove")
      clearTimeout(timeout)
      resolve([e.lngLat.lng, e.lngLat.lat])

      if (!hadMarker && marker) markers.push([id, marker])
    })
  })
}
