import React, { useEffect, useState } from "react";
import { io as Client } from "socket.io-client";

const colors = [
  "#94d699",
  "#e7d57d",
  "#c0f7ff",
  "#fff59d",
  "#FFAB91",
  "#CE93D8",
  "#80CBC4",
  "#c0f7ff",
  "#fff59d",
  "#FFAB91",
  "#CE93D8",
  "#80CBC4",
  "#c0f7ff",
  "#fff59d",
  "#FFAB91",
  "#CE93D8",
  "#80CBC4",
];

const KpiItem = ({
  currentValue,
  color,
  title,
  unit,
  min,
  max,
}: {
  currentValue: number | string | null | undefined;
  color: string;
  title: string;
  unit: string;
  min: number;
  max: number;
}) => {
  return (
    <div className="kpi-box-1" style={{ color, borderColor: color }}>
      <div className="flex-left">
        <div className="kpi-title">{title}</div>
        <div className="kpi-unit">({unit})</div>
        <div className="kpi-max">{max}</div>
        <div className="kpi-min">{min}</div>
      </div>
      <div className="flex-right">
        <div className="kpi-value">{currentValue || "?"}</div>
      </div>
    </div>
  );
};

const KPI = () => {
  const [vitalData, setVitals] = useState([]);
  const [biometric, setBiometric] = useState({
    qtc: undefined,
    deltaQtc: undefined,
    qt: undefined,
    rr: undefined,
    spo2: undefined,
    temp: undefined,
    pr: undefined,
    hr: undefined,
    nibp: undefined,
    st1: undefined,
    st2: undefined,
    st3: undefined,
    st_avr: undefined,
    st_avl: undefined,
    st_avf: undefined,
    st_v: undefined,
  });

  useEffect(() => {
    // const socket = Client("http://40.76.196.190:3001");
    const socket = Client("http://192.168.1.29:3001");
    socket.on("connect", () => {
      console.log(socket.id);
      console.log(socket.connected); // true
      socket.on("bed007", ({ pid, bed, data }) => {
        setVitals(data);
      });
    });

    socket.on("disconnect", (km) => {
      console.log(socket.id);
      console.log(socket.connected); // true
    });
    return () => {
      socket.removeAllListeners();
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    vitalData.map((item: any) => console.log(item.label, item.values));
    setBiometric({
      qtc: getData("QTc") || biometric.qtc,
      deltaQtc: getData("deltaQTc") || biometric.deltaQtc,
      qt: getData("QT") || biometric.qt,
      rr: getData("RR") || biometric.rr,
      spo2: getData("SpO2") || biometric.spo2,
      temp: getData("Temp") || biometric.temp,
      pr: getData("PR") || biometric.pr,
      hr: getData("HR") || biometric.hr,
      nibp: getData("NIBP") || biometric.nibp,
      st1: getData("ST 1") || biometric.st1,
      st2: getData("ST 2") || biometric.st2,
      st3: getData("ST 3") || biometric.st3,
      st_avr: getData("ST aVR") || biometric.st_avr,
      st_avl: getData("ST aVL") || biometric.st_avl,
      st_avf: getData("ST aVF") || biometric.st_avf,
      st_v: getData("ST V") || biometric.st_v,
    });
  }, [vitalData]);

  const getData = (key: any) => {
    let a = undefined;
    for (var i: any = 0; i < vitalData.length; i++) {
      const data: any = vitalData[i];
      if (data.label === key) {
        for (var j: any = 0; j < data.values.length; j++) {
          a = data.values[j][1] || a;
          break;
        }
      }
    }
    return a;
  };

  return (
    <div className="kpi-container">
      <div
        className="kpi-box-2"
        style={{ color: "#FFAB91", borderColor: "#FFAB91" }}
      >
        <div className="flex-left" style={{ flex: 0.5 }}>
          <div className="kpi-title">QTc</div>
          <div className="kpi-unit">(mV)</div>
          <div className="kpi-max"> </div>
          <div className="kpi-min" style={{ marginTop: "3rem" }}>
            500
          </div>
        </div>
        <div className="flex-right">
          <div className="kpi-value">{biometric.qtc || "?"}</div>
        </div>
        <div className="flex-right" style={{ padding: "0rem 4rem" }}>
          <div style={{ display: "flex" }}>
            <div className="flex-left">
              <div className="kpi-title">&#916;QTc</div>
              <div className="kpi-unit">(mV)</div>
              <div className="kpi-max"> </div>
              <div className="kpi-min" style={{ fontSize: "1.5rem" }}>
                60
              </div>
            </div>
            <div className="flex-right">
              <div className="kpi-value" style={{ fontSize: "4rem" }}>
                {biometric.deltaQtc || "?"}
              </div>
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div className="flex-left">
              <div className="kpi-title">QT</div>
              <div className="kpi-unit">(mV)</div>
              <div className="kpi-max"> </div>
              <div className="kpi-min" style={{ fontSize: "1.5rem" }}>
                ?
              </div>
            </div>
            <div className="flex-right">
              <div className="kpi-value" style={{ fontSize: "4rem" }}>
                {biometric.qt || "?"}
              </div>
            </div>
          </div>
        </div>
      </div>
      <KpiItem
        currentValue={biometric.rr || "?"}
        color={"#94d699"}
        title={"RR"}
        unit={"rpm"}
        min={8}
        max={30}
      />
      <KpiItem
        currentValue={biometric.spo2 || "?"}
        color={"#e7d57d"}
        title={"SpO2"}
        unit={"%"}
        min={90}
        max={100}
      />
      <KpiItem
        currentValue={biometric.pr || "?"}
        color={"#CE93D8"}
        title={"PR"}
        unit={"bpm"}
        min={50}
        max={120}
      />
      <KpiItem
        currentValue={biometric.temp || "?"}
        color={"voilet"}
        title={"Temp"}
        unit={"C"}
        min={27}
        max={35}
      />
      <KpiItem
        currentValue={biometric.nibp || "?"}
        color={"#33f59d"}
        title={"NIBP"}
        unit={"mmHg"}
        min={90}
        max={100}
      />
      <div
        className="kpi-box-2"
        style={{ color: "#ffeb3b", borderColor: "#ffeb3b" }}
      >
        <div style={{ marginRight: "3rem" }}>
          <div className="kpi-title">ST</div>
          <div className="kpi-unit">(mV)</div>
        </div>
        <div
          className="flex-left"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div className="key-value">
            <div className="key">I</div>
            <div className="value">{biometric.st1 || "?"}</div>
          </div>
          <div className="key-value">
            <div className="key">II</div>
            <div className="value">{biometric.st2 || "?"}</div>
          </div>
          <div className="key-value">
            <div className="key">III</div>
            <div className="value">{biometric.st3 || "?"}</div>
          </div>
        </div>
        <div
          className="flex-right"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div className="key-value">
            <div className="key">aVR</div>
            <div className="value">{biometric.st_avr || "?"}</div>
          </div>
          <div className="key-value">
            <div className="key">aVL</div>
            <div className="value">{biometric.st_avl || "?"}</div>
          </div>
          <div className="key-value">
            <div className="key">aVF</div>
            <div className="value">{biometric.st_avf || "?"}</div>
          </div>
        </div>
        <div
          className="flex-right"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div className="key-value">
            <div className="key">V</div>
            <div className="value">{biometric.st_v || "?"}</div>
          </div>
        </div>
      </div>
      <KpiItem
        currentValue={biometric.hr || "?"}
        color={"#FFAB91"}
        title={"HR"}
        unit={"bpm"}
        min={50}
        max={120}
      />
    </div>
  );
};

export default KPI;
