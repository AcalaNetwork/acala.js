import { AnyApi } from "@acala-network/sdk-core";
import { NoTxFound } from "../error";

function getTxFee (
  api: AnyApi,
  section: string,
  method: string
) {
  const tx = api.tx[section][method];

  if (!tx) throw new NoTxFound(section, method);

  const params = tx.meta.args.map((a) => api.createType(a.def));

}