export const idlFactory = ({ IDL }) => {
  const Document = IDL.Record({
    'id' : IDL.Text,
    'title' : IDL.Text,
    'content' : IDL.Text,
    'parentId' : IDL.Opt(IDL.Text),
  });
  return IDL.Service({
    'createDocument' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Opt(IDL.Text)],
        [IDL.Text],
        [],
      ),
    'getChildDocuments' : IDL.Func([IDL.Text], [IDL.Vec(Document)], ['query']),
    'getDocument' : IDL.Func([IDL.Text], [IDL.Opt(Document)], ['query']),
    'shareDocument' : IDL.Func([IDL.Text, IDL.Text], [IDL.Bool], []),
    'updateDocument' : IDL.Func([IDL.Text, IDL.Text, IDL.Text], [IDL.Bool], []),
  });
};
export const init = ({ IDL }) => { return []; };
