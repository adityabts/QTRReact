import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { GrFormNext } from "react-icons/gr";

const Navbar = () => {
  const [selectedTime, setTime] = useState<Date | string>(new Date());
  const [showTimeDrop, setShow] = useState(false);

  const reset = (id: number, date: string) => {
    fetch(`http://localhost/reset?id=${id}`);
    setTime(date);
  };

  useEffect(() => {
    if (showTimeDrop) setShow(false);
  }, [selectedTime]);
  return (
    <>
      <div className="row" style={{ height: "8vh" }}>
        <div className=" col-12 navbar__wrapper d-flex justify-content-center align-items-center">
          <div className=" col-md-2 navbar__button  text-center">
            {/*  */}
            <span className="btn btn-1">
              <input
                type="checkbox"
                name=""
                id="switch"
                onChange={(e) =>
                  document.getElementById("root")?.requestFullscreen()
                }
              />
              <label htmlFor="switch"></label>
            </span>
            {/*  */}
          </div>
          <div className="col-md-6 col-lg-5 tabs__wrapper">
            <ul className="list-unstyled m-0 d-flex justify-content-between align-items-center">
              <li>
                <a href="#" className="text-decoration-none">
                  Device{" "}
                </a>
              </li>
              <li>
                <a href="#" className="text-decoration-none">
                  Hospital Name{" "}
                </a>
              </li>
              <li>
                <a href="#" className="text-decoration-none">
                  Building Name{" "}
                </a>
              </li>
              <li>
                <a href="#" className="text-decoration-none">
                  Floor{" "}
                </a>
              </li>
              <li>
                <a href="#" className="text-decoration-none">
                  ICU / Ward{" "}
                </a>
              </li>
              <li>
                <a href="#" className="text-decoration-none">
                  Bed No.{" "}
                </a>
              </li>
              <li>
                <a href="#" className="text-decoration-none">
                  Select Patient ID{" "}
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-1 col-lg-2 col-xl-1  navbar__input">
            <input
              type="text"
              maxLength={7}
              size={6}
              className="navbar__input__box"
              defaultValue={""}
            />
            <span className="edit_icon">
              <FiEdit />
            </span>
          </div>
          <div
            style={{ position: "relative" }}
            className="col-md-3 col-xl-4 text-center navbar__text d-flex justify-content-end align-items-center"
            onClick={() => setShow(!showTimeDrop)}
          >
            <p className="m-0">
              <span className="time__wrapper">
                {new Date(selectedTime).toUTCString()}
              </span>
            </p>
            {showTimeDrop && (
              <div className="time-drop-down">
                <div onClick={() => reset(142, "2022-03-03 22:51:05.000")}>
                  {new Date("2022-03-03 22:51:05.000").toUTCString()}
                </div>
                <div onClick={() => reset(5913, "2022-03-04 00:42:45.000")}>
                  {new Date("2022-03-04 00:42:45.000").toUTCString()}
                </div>
                <div onClick={() => reset(9747, "2022-03-05 01:11:28.000")}>
                  {new Date("2022-03-05 01:11:28.000").toUTCString()}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
