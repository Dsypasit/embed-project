import { useState } from "react";
import Tag from "./_tag";

type tagType = {
  slaveName: string;
  valueType: string;
  value: number;
};

type tagDataType = {
  name: string;
  voltage: number;
  current: number;
  power: number;
};

function updateData(newTag: tagType, tag: tagDataType[]) {
  let obj = tag.filter((o: any) => o.name == newTag.slaveName);
  if (obj.length == 0) {
    return;
  }
  let newObj = obj[0];

  switch (newTag.valueType) {
    case "voltage":
      newObj.voltage = newTag.value;
    case "current":
      newObj.current = newTag.value;
    case "power":
      newObj.power = newTag.value;
  }

  let newData: tagDataType[] = tag.filter((o: any) => o.name !== newTag.slaveName);
  newData.push(newObj);

  return newData;
}

export default function Home() {
  const [temp, setTemp] = useState({
    value: 35,
  });

  const [tag, setTag] = useState([
    {
      name: "Main",
      data: {
        voltage: 0,
        current: 0,
        power: 0,
      },
    },
    {
      name: "Sub1",
      data: {
        voltage: 0,
        current: 0,
        power: 0,
      },
    },
    {
      name: "Sub2",
      data: {
        voltage: 0,
        current: 0,
        power: 0,
      },
    },
    {
      name: "Sub3",
      data: {
        voltage: 0,
        current: 0,
        power: 0,
      },
    },
  ]);

  return (
    <div className="bg-rose-400 h-full py-20">
      <div className="flex justify-center text-center">
        <h1 className="text-5xl font-bold mt-10">TIWONG MONITORING</h1>
      </div>
      <div className="container mx-auto mt-20">
        <div className="flex text-center justify-center">
          <h1 className="text-xl font-bold">Information</h1>
        </div>
        <div className="mt-10 flex justify-center">
          <div className="block mx-5 py-24 px-40 bg-rose-300 border border-gray-200 rounded-lg shadow drop-shadow-md hover:drop-shadow-2xl ease-in duration-300">
            <div className="text-center w-full">
              <h1 className="text-center">temporature</h1>
            </div>
            <h5 className="mb-2 text-center text-2xl font-bold tracking-tight text-gray-900">
              {temp.value} c
            </h5>
          </div>
        </div>
      </div>
      <Tag tag={tag[0].name} data={tag[0].data} />
      <Tag tag={tag[1].name} data={tag[1].data} />
      <Tag tag={tag[2].name} data={tag[2].data} />
      <Tag tag={tag[3].name} data={tag[3].data} />
    </div>
  );
}
