import { useEffect, useState } from "react";
import Tag from "./_tag";
import useWebSocket, { ReadyState } from "react-use-websocket";

type tagType = {
  slaveName: string;
  valueType: string;
  value: number;
};

type tagDataType = {
  name: string;
  data: {
    voltage: number;
    current: number;
    power: number;
  };
};

async function updateTag(newTag: tagType, tag: tagDataType[]) {
  let obj = tag.filter((o) => o.name == newTag.slaveName);
  console.log(obj);
  
  if (obj.length == 0) {
    return tag;
  }
  let newObj = obj[0];

  switch (newTag.valueType) {
    case "voltage":
      newObj.data.voltage = newTag.value;
    case "current":
      newObj.data.current = newTag.value;
    case "power":
      newObj.data.power = newTag.value;
  }

  let newData: tagDataType[] = tag.filter(
    (o: any) => o.name !== newTag.slaveName
  );
  newData.push(newObj);
  console.log(newData);
  return newData;
}

export default function Home() {
  const [temp, setTemp] = useState({
    value: 35,
  });

  const [tag, setTag] = useState<tagDataType[]>([
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

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    "ws://localhost:8080"
  );

  useEffect(() => {
    if (lastMessage !== null) {
      let messageData = JSON.parse(lastMessage?.data);
      if (messageData.type === "temp") {
        setTemp({ value: messageData.data.value });
      } else {
        const fetch = async () => {
          let newTag = await updateTag(messageData.data, tag);
          await setTag(newTag);
        };
        fetch()
      }
      //   switch (messageData.type) {
      //     case "temp":
      //       setTemp({ value: messageData.data.value });
      //     case "tag":
      //       console.log(messageData);
      //       let newTag = updateTag(messageData.data, tag);
      //       setTag(newTag);
      //   }
    }
  }, [lastMessage, setTag, setTemp]);

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
              {temp.value.toFixed(2)} c
            </h5>
          </div>
        </div>
      </div>
      {tag.map((obj, i) => {
        if (obj.name === "Main") {
          return <Tag key={i} tag={obj.name} data={obj.data} />;
        }
      })}
      {tag.map((obj, i) => {
        if (obj.name === "Sub1") {
          return <Tag key={i} tag={obj.name} data={obj.data} />;
        }
      })}
      {tag.map((obj, i) => {
        if (obj.name === "Sub2") {
          return <Tag key={i} tag={obj.name} data={obj.data} />;
        }
      })}
      {tag.map((obj, i) => {
        if (obj.name === "Sub3") {
          return <Tag key={i} tag={obj.name} data={obj.data} />;
        }
      })}
    </div>
  );
}
