open Unix
open Format
open Yojson.Basic.Util

module Json = Yojson

let json_error json =
  printf "error: %s@." (to_string json); assert false

let window = (1360, 768)

let center = (680, 384)

let mesh_x = 37
let mesh_y = 28

let threshold = 5.

let parse_init json =
  printf "begin: parse_init@.";
  begin match json with
    | `Assoc [("num", `Int i); ("arr", `List l)] ->
      let arr = List.fold_left (fun acc item -> match item with
          | `List [`Int x; `Int y] -> (x, y) :: acc
          | _ -> json_error item) [] l
      |> List.rev
      |> Array.of_list in
      (i, arr)
    | _ -> json_error json
  end

(* let parse_init json = *)
(*   let n = match Json.Util.member "num" json with *)
(*       `Int i -> i | _ -> assert false in *)
(*   let arr = match Json.Util.member "arr" json with *)
(*     | `List l -> begin *)
(*       List.fold_left (fun acc item -> match item with *)
(*           | `List [`Int x; `Int y] -> (x, y) :: acc *)
(*           | _ -> json_error item) [] l *)
(*       |> List.rev *)
(*       |> Array.of_list end *)
(*     | _ -> assert false in *)
(*   (n, arr) *)

let print poss =
  Array.iter (fun (x, y) -> printf "%d %d@." x y) poss

let get_mesh json =
  let h = Array.make 1036 false in
  begin match json with
    | `Assoc ["mesh", `List l] ->
      List.iteri (fun ind -> function `Bool b -> h.(ind) <- b
                                    | _ -> assert false) l
    | _ -> json_error json
  end; h

let square = ( ** )

let ( ++ ) (a, b) (c, d) = (a + c, b + d)
let ( +++ ) (a, b) (c, d) = (a +. c, b +. d)
let ( ** ) n (a, b) = (n * a, n * b)
let ( *** ) d (a, b) = (d *. float_of_int a, d *. float_of_int b)
let ( -- ) (a, b) (c, d) = (a - c, b - d)
let ( --- ) (a, b) (c, d) = (a -. c, b -. d)
let ( /// ) (a, b) f = (a /. f, b /. b)

let to_vec (a, b) = (float_of_int a, float_of_int b)
let of_vec (a, b) = (int_of_float a, int_of_float b)

let scala (x, y) = x * x + y * y |> float_of_int |> sqrt

let update vecs poss mesh =
  let len = Array.length vecs in
  for i = 0 to len - 1 do
    let px, py = poss.(i) in
    let v =
      if try mesh.(px / mesh_x + py / mesh_y * mesh_x) with _ -> eprintf "error"; false
      then (Random.float 5.0 -. 10.0 , 5.0)
      else to_vec ((poss.(i) -- center)) /// 0.01 in
    vecs.(i) <- vecs.(i) +++ v;
    poss.(i) <- to_vec poss.(i) +++ v |> of_vec
  done

let create_json arr =
  Array.map (fun (x, y) -> `List [`Int x; `Int y]) arr
  |> Array.to_list
  |> (fun l -> `List l)

let rec loop ic oc num vecs poss =
  printf "start loop@.";
  let json = Json.Basic.from_channel ic in
  let mesh = get_mesh json in
  update vecs poss mesh;
  let json = create_json poss in
  Json.to_channel oc json;
  flush oc;
  loop ic oc num vecs poss

let main () =
  let addr = ADDR_INET (inet_addr_of_string "127.0.0.1", 3300) in
  establish_server (fun ic oc ->
      let init = Yojson.Basic.from_channel ic in
      printf "connection success@.";
      let num, poss = parse_init init in
      let vecs = Array.make (Array.length poss) (0., 0.) in
      printf "start loop@.";
      loop ic oc num vecs poss) addr

let _ = Unix.handle_unix_error main ()
