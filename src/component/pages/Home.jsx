import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export const Home = () => {
  const [Data, setData] = useState([]);

  const url = "https://jsonplaceholder.typicode.com/posts?_limit=10";

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          return Error("Oh no");
        }
        return res.json();
      })
      .then((data) => setData(data));
  }, []);

  const Pin = (e) => {
    let data = Data ? [...Data] : [];
    let newData = [];
    data.forEach((o, i) => {
      newData.push({
        pin: e === o.id ? "y" : o.pin ? o.pin : "n",
        order: data.length - i + "",
        id: o.id,
        index: i,
        // title: o.title,
        // body: o.body,
      });
    });
    console.log("@data", newData);
    setData(newData);
  };

  useEffect(() => {
    if (Data) setData(Data);
  }, [Data]);

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    const newItems = [...Data];
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);
    setData(newItems);
    console.log("@data", newItems);
    // newItems?.map((o, i) => {
    //   if (o.pin) {
    //     if (o.pin === "y") {
    //       alert("Pin data order can't be changed");
    //       return setData(Data);
    //     }
    //     else {
    //       return setData(newItems);
    //     }
    //   } else {
    //     return setData(newItems);
    //   }
    // });
  }

  return (
    <div className="d-flex justify-content-center">
      <div className="col-sm-12 col-md-6 col-lg-4">
        <h5 className="mt-4 py-3"> Order with pin</h5>
        <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {Data.map((o, i) => (
                  <Draggable draggableId={`${o.id}`} key={o.id} index={i}>
                    {(provided, snapshot) => (
                      <div ref={provided.innerRef} {...provided.draggableProps}>
                        <div className="card m-3 py-2">
                          <div className="d-flex p-2 justify-content-between align-items-center pt-0 mt-0">
                            <div className="border-end p-3">
                              <span>Index: {i}</span>
                            </div>
                            <div className="">
                              <div className="d-flex justify-content-between p-2">
                                <span>Id: {o.id}</span>
                              </div>
                              <h6 className="card-title p-1 pb-0">
                                {o.title
                                  ? o.title?.length < 10
                                    ? o.title
                                    : o.title?.slice(0, 10)
                                  : ""}
                              </h6>
                              <div className="card-body p-0 mt-0 pt-0">
                                {o.body ? "" : <span>Order = {o.order}</span>}
                              </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-center border-start border-end px-3">
                              <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => Pin(o.id)}
                              >
                                Pin
                              </button>
                            </div>
                            <div className="d-flex justify-content-around align-items-center px-2">
                              {o.pin === "y" ? (
                                <span className="text-start">
                                  <i class="ri-pushpin-fill"></i>
                                </span>
                              ) : (
                                <span></span>
                              )}
                              {o.pin && o.pin === "y" ? null : (
                                <span
                                  className="user-select-all cursor-pointer"
                                  {...provided.dragHandleProps}
                                >
                                  <i class="ri-drag-move-2-line fs-4"></i>
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

// {
//   Data?.map((o, i) => {
//     return (
//       <div className="card m-3 py-2" draggable="true" onDrag={Drag}>
//         {o.pin === "y" ? (
//           <span className="text-start mx-3 mt-3">
//             <i class="ri-pushpin-fill"></i>
//           </span>
//         ) : null}
//         <div className="d-flex p-2 align-items-center pt-0 mt-0">
//           <div className="border-end p-3">
//             <span>
//               Index: {i}
//               <br></br>
//             </span>
//           </div>
//           <div className="">
//             <div className="d-flex justify-content-between p-2">
//               <span>Id: {o.id}</span>
//               <span className="user-select-all cursor-pointer">
//                 <i class="ri-drag-move-2-line fs-4"></i>
//               </span>
//             </div>
//             <h6 className="card-title p-1 pb-0">{o.title}</h6>
//             <div className="card-body p-3 mt-0 pt-0">{o.body}</div>
//             <button
//               className="btn btn-outline-primary"
//               onClick={() => Pin(o.id)}
//             >
//               Pin
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   });
// }
