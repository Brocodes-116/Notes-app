function App() {

  return (
    <>
      <div className="bg-zinc-900 text-white w-full min-h-screen p-10">
        <div className="max-w-[1200px] mx-auto my-0 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
          <div className="card min-h-30 bg-zinc-700 rounded-xl border-2 border-dotted border-white/80 flex flex-col justify-center items-center cursor-pointer hover:scale-105 duration-400">
            <span className="w-10 h-10 bg-blue-500 rounded-full flex justify-center items-center"><i class="fa-solid fa-plus"></i></span>{/*Icon*/}
            <p className="p-1">Add new notes</p>       
          </div>
        </div>
      </div>
    </>
  )
}

export default App
