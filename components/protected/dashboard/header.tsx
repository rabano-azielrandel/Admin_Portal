const data = [
  { name: "Tables", qty: 2 },
  { name: "Functions", qty: 2 },
  { name: "Replicas", qty: 2 },
];

const header = () => {
  return (
    <div className="flex w-full">
      <div className="w-full p-4 bg-green-300">
        <p className="text-lg font-medium tracking-wider">HEY THERE CHIEF!</p>
      </div>
      <div className="w-full flex justify-end gap-4 pr-4 bg-amber-300">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col border boder-black">
            <p className="text-xs font-light">{item.name}</p>
            <p className="text-lg font-medium">{item.qty}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default header;
