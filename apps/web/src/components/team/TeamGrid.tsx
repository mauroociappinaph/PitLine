import { TeamCard } from "./TeamCard";
import { Driver } from "shared-types";

const MOCK_TEAMS = [
  {
    teamName: "Red Bull Racing",
    teamColor: "#3671C6",
    drivers: [
      { driverNumber: 1, firstName: "Max", lastName: "Verstappen", nameAcronym: "VER" },
      { driverNumber: 11, firstName: "Sergio", lastName: "Perez", nameAcronym: "PER" }
    ] as Driver[]
  },
  {
    teamName: "Mercedes",
    teamColor: "#6CD3BF",
    drivers: [
      { driverNumber: 44, firstName: "Lewis", lastName: "Hamilton", nameAcronym: "HAM" },
      { driverNumber: 63, firstName: "George", lastName: "Russell", nameAcronym: "RUS" }
    ] as Driver[]
  },
  {
    teamName: "Ferrari",
    teamColor: "#E80020",
    drivers: [
      { driverNumber: 16, firstName: "Charles", lastName: "Leclerc", nameAcronym: "LEC" },
      { driverNumber: 55, firstName: "Carlos", lastName: "Sainz", nameAcronym: "SAI" }
    ] as Driver[]
  },
  {
    teamName: "Cadillac Racing",
    teamColor: "#FFD700",
    drivers: [
      { driverNumber: 0, firstName: "TBD", lastName: "Driver 1", nameAcronym: "TBD" },
      { driverNumber: 0, firstName: "TBD", lastName: "Driver 2", nameAcronym: "TBD" }
    ] as Driver[]
  }
];

export function TeamGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {MOCK_TEAMS.map((team) => (
        <TeamCard
          key={team.teamName}
          teamName={team.teamName}
          teamColor={team.teamColor}
          drivers={team.drivers}
        />
      ))}
    </div>
  );
}
