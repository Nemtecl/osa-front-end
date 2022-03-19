/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable dot-notation */
import React, { useState, useRef } from "react";
import ReactMapGL, { GeolocateControl, Marker } from "react-map-gl";
import useSupercluster from "use-supercluster";
import { TextField } from "@mui/material";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@mui/material/Divider";
import FilterListIcon from "@mui/icons-material/FilterList";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { ListItemText } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import Pin from "./Pin.map";
import { MapView } from "./utils/types";

export default function Map(props: any) {
  const { points, setselectedArtWork } = props;
  const { t } = useTranslation();

  // DEFAULT MAP STATE
  const [viewport, setViewport] = useState({
    latitude: 49.43424,
    longitude: 1.08972,
    zoom: 10,
  });

  // REF TO GET BOUNDS OF THE MAP, USED LATER ON CLUSTERS
  const mapRef = useRef<any>();

  // GET BOUNDS : [lat,long,lat,long] (4 corners)
  const bounds = mapRef.current
    ? mapRef.current.getMap().getBounds().toArray().flat()
    : null;

  // ADD CLUSTERS, SUPERCLUSTER
  // cluster options (70,20)
  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom: viewport.zoom,
    options: { radius: 30, maxZoom: 20 },
  });

  // Search Bar states and functions

  const [filter, setFilter] = useState("Ville");
  const [value, setValue] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSearchBarChange = (e: any) => {
    console.log(`${e.target.value}`);
    setValue(e.target.value);
  };
  async function Search() {
    const input = value;
    const url = `${process.env.REACT_APP_GET_ART_NAME}/${input}`;
    try {
      const res: Response = await fetch(url, {
        method: "GET",
      });
      if (res.ok) {
        console.log(res);
        const jsonData = await res.json();
        setViewport({
          ...viewport,
          latitude: Number(jsonData.art.latitude),
          longitude: Number(jsonData.art.longitude),
          zoom: 16,
        });
      } else if (!res.ok) {
        if (res.status === 404) {
          throw Error("Art Does not Exist");
        }
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }
  async function SearchTown() {
    const input = value;
    const url = `https://nominatim.openstreetmap.org/search?city=${input}&format=geojson&limit=1`;
    try {
      const res: Response = await fetch(url);
      if (res.ok) {
        const jsonData = await res.json();
        setViewport({
          ...viewport,
          latitude: Number(jsonData.features[0].bbox[1]),
          longitude: Number(jsonData.features[0].bbox[0]),
          zoom: 8,
        });
      } else if (!res.ok) {
        throw Error("Error");
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }

  // End of search bar

  function markerClick(cluster: any, latitude: number, longitude: number) {
    const expansionZoom = Math.min(
      supercluster.getClusterExpansionZoom(cluster.id),
      20
    );
    setViewport({
      ...viewport,
      latitude,
      longitude,
      zoom: expansionZoom,
    });
  }
  return (
    <ReactMapGL
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...viewport}
      width="100vw"
      height="100vh"
      className="w-100 h-100"
      maxZoom={18}
      mapStyle={process.env.REACT_APP_MAPBOX_STYLE}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={(newViewport: MapView) => {
        setViewport({ ...newViewport });
      }}
      ref={mapRef}
      keyboard={false}
      attributionControl={false}
    >
      <TextField
        margin="none"
        className="bg-white"
        fullWidth
        id="SearchBar"
        name="SearchBar"
        autoComplete="SearchBar"
        placeholder={`${
          filter === "Titre"
            ? t("searchBarTitre-placeholder")
            : t("searchBarVille-placeholder")
        }`}
        value={value}
        onChange={handleSearchBarChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => {
                  if (filter === "Titre") {
                    Search();
                  } else {
                    SearchTown();
                  }
                }}
              >
                <SearchIcon />
              </IconButton>
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                <FilterListIcon />
              </IconButton>

              <Menu
                id="fade-menu"
                MenuListProps={{
                  "aria-labelledby": "fade-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
                PaperProps={{
                  style: {
                    width: 100,
                  },
                }}
              >
                <MenuItem
                  onClick={() => {
                    setFilter("Ville");
                    handleClose();
                  }}
                >
                  {filter === "Ville" && (
                    <ListItemText style={{ paddingLeft: 30, color: "red" }}>
                      {t("city")}
                    </ListItemText>
                  )}
                  {filter === "Titre" && (
                    <ListItemText style={{ paddingLeft: 30 }}>
                      {t("city")}
                    </ListItemText>
                  )}
                </MenuItem>
                <Divider orientation="horizontal" flexItem />
                <MenuItem
                  onClick={() => {
                    setFilter("Titre");
                    handleClose();
                  }}
                >
                  {filter === "Titre" && (
                    <ListItemText style={{ paddingLeft: 30, color: "red" }}>
                      {t("Title")}
                    </ListItemText>
                  )}
                  {filter === "Ville" && (
                    <ListItemText style={{ paddingLeft: 30 }}>
                      {t("Title")}
                    </ListItemText>
                  )}
                </MenuItem>
              </Menu>
            </InputAdornment>
          ),
        }}
      />
      <GeolocateControl
        className="top-16 left-2 z-10"
        showUserHeading
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation
        auto
        onGeolocate={(PositionOptions: any) => {
          props.getUserLat(PositionOptions["coords"].latitude);
          props.getUserLong(PositionOptions["coords"].longitude);
        }}
      />

      {clusters.map((cluster: any) => {
        const [longitude, latitude] = cluster.geometry.coordinates;
        const { cluster: isCluster, point_count: pointCount } =
          cluster.properties;
        let style;

        if (isCluster) {
          if (pointCount < 10) style = 1;
          else if (pointCount < 50) style = 2;
          else if (pointCount < 100) style = 3;
          else style = 4;
          return (
            <Marker
              key={`cluster-${cluster.id}`}
              latitude={latitude}
              longitude={longitude}
            >
              <div
                role="button"
                tabIndex={0}
                className={`flex items-center justify-center s-${style} opacity-60 text-white text-lg border-2 border-white rounded-full z-1`}
                onClick={() => markerClick(cluster, latitude, longitude)}
                onKeyDown={() => {}}
              >
                {pointCount}
              </div>
            </Marker>
          );
        }

        return (
          <Marker
            key={`oeuvre-${cluster.properties.oeuvreId}`}
            latitude={latitude}
            longitude={longitude}
          >
            {setselectedArtWork && (
              <Pin
                pic={cluster.properties.pictures[0].url}
                onClick={() => setselectedArtWork(cluster)}
              />
            )}
            {!setselectedArtWork && <Pin size={20} onClick={() => {}} />}
          </Marker>
        );
      })}
    </ReactMapGL>
  );
}
