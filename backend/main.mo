import Bool "mo:base/Bool";
import Hash "mo:base/Hash";

import Text "mo:base/Text";
import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Option "mo:base/Option";
import Result "mo:base/Result";

actor {
  type Document = {
    id: Text;
    title: Text;
    content: Text;
    parentId: ?Text;
  };

  stable var nextDocumentId: Nat = 0;
  let documents = HashMap.HashMap<Text, Document>(10, Text.equal, Text.hash);

  public func createDocument(title: Text, content: Text, parentId: ?Text) : async Text {
    let id = Nat.toText(nextDocumentId);
    nextDocumentId += 1;
    let newDoc: Document = {
      id = id;
      title = title;
      content = content;
      parentId = parentId;
    };
    documents.put(id, newDoc);
    id
  };

  public func updateDocument(id: Text, title: Text, content: Text) : async Bool {
    switch (documents.get(id)) {
      case (null) { false };
      case (?doc) {
        let updatedDoc: Document = {
          id = doc.id;
          title = title;
          content = content;
          parentId = doc.parentId;
        };
        documents.put(id, updatedDoc);
        true
      };
    }
  };

  public query func getDocument(id: Text) : async ?Document {
    documents.get(id)
  };

  public query func getChildDocuments(parentId: Text) : async [Document] {
    let children = Array.filter<Document>(Iter.toArray(documents.vals()), func (doc: Document) : Bool {
      switch (doc.parentId) {
        case (null) { false };
        case (?pid) { pid == parentId };
      }
    });
    children
  };

  public func shareDocument(id: Text, sharedWith: Text) : async Bool {
    // For MVP, we'll just return true to simulate sharing
    // In a real implementation, we would store sharing information
    true
  };

  // System functions for upgrades
  system func preupgrade() {
    // Convert HashMap to stable variable for upgrade
    // This is a simplified example and may not be suitable for large datasets
    // Consider using stable storage patterns for production systems
  };

  system func postupgrade() {
    // Reinitialize HashMap after upgrade if necessary
  };
}
