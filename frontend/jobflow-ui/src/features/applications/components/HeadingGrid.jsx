const tableHead = [
  { id: 1, name: "Email" },
  { id: 2, name: "Application Date" },
  { id: 3, name: "Application Details" },
  { id: 4, name: "Digital CV" },
  { id: 5, name: "Status" },
];

function HeadingGrid() {
  return (
    <div className="border-black-color/10 hidden grid-cols-6 gap-4 border-b p-2 font-bold xl:grid">
      {tableHead.map((header) => (
        <div key={header.id}>
          <p className="text-black-color font-semibold"> {header.name}</p>
        </div>
      ))}
    </div>
  );
}

export default HeadingGrid;
