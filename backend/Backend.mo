import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Nat "mo:base/Nat";

actor Backend {
  // Define a type to represent each chat message
  public type Message = {
    role: Text;
    content: Text;
  };

  // Define a HashMap to store session data
  private var chatHistory = HashMap.HashMap<Text, [Message]>(0, Text.equal, Text.hash);

  // Keep track of the next session ID
  private stable var nextSessionID: Nat = 0;

  // Function to create a new session and return its ID
  public func createSession(): async Text {
    let sessionID = "key" # Nat.toText(nextSessionID);
    nextSessionID += 1;
    chatHistory.put(sessionID, []);
    return sessionID;
  };

  // Function to add a message to an existing session
  public func addMessage(sessionID: Text, message: Message): async Bool {
    switch (chatHistory.get(sessionID)) {
      case (?existingMessages) {
        chatHistory.put(sessionID, Array.append(existingMessages, [message]));
        true;
      };
      case null { false; }; // Return false if the sessionID does not exist
    };
  };

  // Function to retrieve all messages for a given session
  public query func getMessages(sessionID: Text): async ?[Message] {
    chatHistory.get(sessionID);
  };

 public query func getAllSessionIDs(): async [Text] {
    var keys: [Text] = [];
    for (key in chatHistory.keys()) {
        keys := Array.append<Text>(keys, [key]); // Use Array.append to append
    };
    return keys;
}
}
