import mockIdeaData from "../assets/mockIdeaData.json";

export default function generateIdeas() {
  localStorage.setItem("IDEA_DATA", JSON.stringify(mockIdeaData));
}
