export class NutsDexOnlySupportApiRx extends Error {
  constructor() {
    super();
    this.name = 'NutsDexOnlySupportApiRx';
    this.message = 'Nuts Dex only support api rx';
  }
}

export class NutsDexDontSupportExactOutput extends Error {
  constructor() {
    super();
    this.name = 'NutsDexDontSupportExactOutput';
    this.message = "Nuts Dex don't support EXACT_OUTPUT";
  }
}
