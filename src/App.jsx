import { useState } from "react"

function App() {

  const [Show, setShow] = useState(false);
  const [Title, setTitle] = useState("");
  const [Desc, setDesc] = useState("");
  const [Tasks, setTasks] = useState([]);


  const handleDelete = (index) => {
    let copiedData = [...Tasks];
    copiedData.splice(index, 1);
    setTasks(copiedData);
  }
  return (
    <>
      <div className={`bg-zinc-800 text-white w-full min-h-screen p-10`}>
        <div className="max-w-[1200px] mx-auto my-0 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
          <div
            onClick={() => {
              setShow(s => !s);
              console.log(Show)

            }}
            className="card min-h-30 bg-zinc-700 rounded-xl border-2 border-dashed border-white/80 flex flex-col justify-center items-center cursor-pointer hover:scale-105 duration-400">
            <span className="w-10 h-10 bg-blue-500 rounded-full flex justify-center items-center"><i class="fa-solid fa-plus"></i></span>{/*Icon*/}
            <p className="p-1">Add new notes</p>
          </div>

          {/* The add new note Dialouge box   */}
          {/* {Show && (
            <div className="popup z-1 bg-zinc-800 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] p-5 rounded-2xl border border-white ">
              <h3 className="text-xl text-zinc-200 font-bold pb-3">Add a New Note</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log(`${Title} - ${Desc}`)

                  if (Title.trim() === ' ' || Desc.trim() === '') {
                    alert("Please enter the Fields!!!");
                    return;
                  }

                  let data = [...Tasks];
                  data.push({ Title, Desc });
                  setTasks(data);
                  setDesc("");
                  setTitle("");
                  setShow(!Show)
                }}
                action=""
                className="flex flex-col items-center gap-3 ">
                <input
                  value={Title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  className="w-full border border-white px-4 py-2 rounded-lg"
                  type="text"
                  name="title"
                  placeholder="Enter Heading..." />
                <textarea
                  value={Desc}
                  onChange={(e) =>
                    setDesc(e.target.value)
                  }
                  className="w-full border border-white px-4 py-2 rounded-lg"
                  name="description"
                  id=""
                  rows="10"
                  placeholder="Enter Description Here..."></textarea>
                <button className="bg-blue-500 w-full font-bold tracking-wider py-2 rounded-xl cursor-pointer">Add Note</button>
              </form>
            </div>
          )} */}

          {Show && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              {/* BACKDROP */}
              <div
                className="absolute inset-0 bg-zinc-700/80"
                onClick={() => setShow(false)} // close modal when clicking outside
              ></div>

              {/* MODAL */}
              <div className="relative z-10 bg-zinc-800 w-[400px] p-5 rounded-2xl border border-white">
                <h3 className="text-xl text-zinc-200 font-bold pb-3">Add a New Note</h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (Title.trim() === "" || Desc.trim() === "") {
                      alert("Please enter the Fields!!!");
                      return;
                    }
                    setTasks([...Tasks, { Title, Desc }]);
                    setDesc("");
                    setTitle("");
                    setShow(false);
                  }}
                  className="flex flex-col items-center gap-3"
                >
                  <input
                    value={Title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border border-white px-4 py-2 rounded-lg"
                    type="text"
                    placeholder="Enter Heading..."
                  />
                  <textarea
                    value={Desc}
                    onChange={(e) => setDesc(e.target.value)}
                    className="w-full border border-white px-4 py-2 rounded-lg"
                    rows="10"
                    placeholder="Enter Description Here..."
                  ></textarea>
                  <button className="bg-blue-500 w-full font-bold tracking-wider py-2 rounded-xl cursor-pointer">
                    Add Note
                  </button>
                </form>
              </div>
            </div>
          )}


          {Tasks.map((items, index) => {
            return (
              <div
                className="card min-h-30 bg-zinc-700 rounded-xl border-3 border-solid border-white/40 flex flex-col justify-center items-start cursor-pointer hover:scale-105 duration-400 p-5 gap-1">
                <div
                  className="w-full flex justify-between">
                  <span className="w-[80%]">
                    <h1 className="text-3xl font-bold tracking-wide break-words line-clamp-3">{items.Title}</h1>
                  </span>
                  <div className="w-[15%] flex justify-end">
                    <span
                      onClick={() => {
                        handleDelete(index);
                      }}
                      className="w-9 h-9 bg-amber-100 text-red-700 text-xl flex justify-center items-center rounded-full">
                      <i className="fa-solid fa-x"></i>
                    </span>
                  </div>
                </div>
                <p className="text-lg font-medium tracking line-clamp-2">{items.Desc}</p>
              </div>
            )
          })}

        </div>
      </div>
    </>
  )
}

export default App
