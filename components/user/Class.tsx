import { ClassObject } from "@lib/utils/parsers";

interface ClassProps {
  data: number;
  className: string;
}

export default function Class({ data, className }: ClassProps) {
  const classData = new ClassObject(data);

  return (
    <div tabIndex={0} className="card card-bordered bg-gray-800 text-white">
      <div className="card-body">
        <div className="card-title text-xl font-medium">
          <h1 className="font-bold text-white">{className}</h1>
        </div>
        
          <ul className="text-white">
            <li>
              <span className="font-bold">Primary:</span>{" "}
              {classData.primaryWeapon}
            </li>
            <li>
              <span className="font-bold">Secondary:</span>{" "}
              {classData.secondaryWeapon}
            </li>
            <li>
              <span className="font-bold">Perk:</span> {classData.perk}
            </li>
            <li>
              <span className="font-bold">Character:</span>{" "}
              {classData.character}
            </li>
            <li>
              <span className="font-bold">Hat:</span> {classData.hat}
            </li>
          </ul>
      </div>
    </div>
  );
}
