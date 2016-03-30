console.log("Testing if this is even showing");

api.store.put("mySecretKey", 6000);

var results = api.boa.run("my-boa-script.boa");

// var results = api.boa.exec("p: Project = input;"+
// "counts: output sum[string] of int;"+
// "committers: map[string] of bool;"+
// "visit(p, visitor {"+
// "	before node: Revision ->"+
// "		if (!haskey(committers, node.committer.username)) {"+
// "			committers[node.committer.username] = true;"+
// "			counts[p.id] << 1;"+
// "		}");

for (var x in results)
{
  // for (var y in x)
  // {
    console.log(x);
  // }
};