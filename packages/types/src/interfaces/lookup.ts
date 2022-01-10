// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

/* eslint-disable sort-keys */

export default {
  /**
   * Lookup3: frame_system::AccountInfo<Index, pallet_balances::AccountData<Balance>>
   **/
  FrameSystemAccountInfo: {
    nonce: 'u32',
    consumers: 'u32',
    providers: 'u32',
    sufficients: 'u32',
    data: 'PalletBalancesAccountData'
  },
  /**
   * Lookup5: pallet_balances::AccountData<Balance>
   **/
  PalletBalancesAccountData: {
    free: 'u128',
    reserved: 'u128',
    miscFrozen: 'u128',
    feeFrozen: 'u128'
  },
  /**
   * Lookup7: frame_support::weights::PerDispatchClass<T>
   **/
  FrameSupportWeightsPerDispatchClassU64: {
    normal: 'u64',
    operational: 'u64',
    mandatory: 'u64'
  },
  /**
   * Lookup11: sp_runtime::generic::digest::Digest
   **/
  SpRuntimeDigest: {
    logs: 'Vec<SpRuntimeDigestDigestItem>'
  },
  /**
   * Lookup13: sp_runtime::generic::digest::DigestItem
   **/
  SpRuntimeDigestDigestItem: {
    _enum: {
      Other: 'Bytes',
      __Unused1: 'Null',
      __Unused2: 'Null',
      __Unused3: 'Null',
      Consensus: '([u8;4],Bytes)',
      Seal: '([u8;4],Bytes)',
      PreRuntime: '([u8;4],Bytes)',
      __Unused7: 'Null',
      RuntimeEnvironmentUpdated: 'Null'
    }
  },
  /**
   * Lookup16: frame_system::EventRecord<karura_runtime::Event, primitive_types::H256>
   **/
  FrameSystemEventRecord: {
    phase: 'FrameSystemPhase',
    event: 'Event',
    topics: 'Vec<H256>'
  },
  /**
   * Lookup18: frame_system::pallet::Event<T>
   **/
  FrameSystemEvent: {
    _enum: {
      ExtrinsicSuccess: 'FrameSupportWeightsDispatchInfo',
      ExtrinsicFailed: '(SpRuntimeDispatchError,FrameSupportWeightsDispatchInfo)',
      CodeUpdated: 'Null',
      NewAccount: 'AccountId32',
      KilledAccount: 'AccountId32',
      Remarked: '(AccountId32,H256)'
    }
  },
  /**
   * Lookup19: frame_support::weights::DispatchInfo
   **/
  FrameSupportWeightsDispatchInfo: {
    weight: 'u64',
    class: 'FrameSupportWeightsDispatchClass',
    paysFee: 'FrameSupportWeightsPays'
  },
  /**
   * Lookup20: frame_support::weights::DispatchClass
   **/
  FrameSupportWeightsDispatchClass: {
    _enum: ['Normal', 'Operational', 'Mandatory']
  },
  /**
   * Lookup21: frame_support::weights::Pays
   **/
  FrameSupportWeightsPays: {
    _enum: ['Yes', 'No']
  },
  /**
   * Lookup22: sp_runtime::DispatchError
   **/
  SpRuntimeDispatchError: {
    _enum: {
      Other: 'Null',
      CannotLookup: 'Null',
      BadOrigin: 'Null',
      Module: {
        index: 'u8',
        error: 'u8',
      },
      ConsumerRemaining: 'Null',
      NoProviders: 'Null',
      Token: 'SpRuntimeTokenError',
      Arithmetic: 'SpRuntimeArithmeticError'
    }
  },
  /**
   * Lookup23: sp_runtime::TokenError
   **/
  SpRuntimeTokenError: {
    _enum: ['NoFunds', 'WouldDie', 'BelowMinimum', 'CannotCreate', 'UnknownAsset', 'Frozen', 'Unsupported']
  },
  /**
   * Lookup24: sp_runtime::ArithmeticError
   **/
  SpRuntimeArithmeticError: {
    _enum: ['Underflow', 'Overflow', 'DivisionByZero']
  },
  /**
   * Lookup25: pallet_scheduler::pallet::Event<T>
   **/
  PalletSchedulerEvent: {
    _enum: {
      Scheduled: '(u32,u32)',
      Canceled: '(u32,u32)',
      Dispatched: '((u32,u32),Option<Bytes>,Result<Null, SpRuntimeDispatchError>)'
    }
  },
  /**
   * Lookup30: pallet_utility::pallet::Event
   **/
  PalletUtilityEvent: {
    _enum: {
      BatchInterrupted: {
        index: 'u32',
        error: 'SpRuntimeDispatchError',
      },
      BatchCompleted: 'Null',
      ItemCompleted: 'Null',
      DispatchedAs: 'Result<Null, SpRuntimeDispatchError>'
    }
  },
  /**
   * Lookup31: pallet_multisig::pallet::Event<T>
   **/
  PalletMultisigEvent: {
    _enum: {
      NewMultisig: {
        approving: 'AccountId32',
        multisig: 'AccountId32',
        callHash: '[u8;32]',
      },
      MultisigApproval: {
        approving: 'AccountId32',
        timepoint: 'PalletMultisigTimepoint',
        multisig: 'AccountId32',
        callHash: '[u8;32]',
      },
      MultisigExecuted: {
        approving: 'AccountId32',
        timepoint: 'PalletMultisigTimepoint',
        multisig: 'AccountId32',
        callHash: '[u8;32]',
        result: 'Result<Null, SpRuntimeDispatchError>',
      },
      MultisigCancelled: {
        cancelling: 'AccountId32',
        timepoint: 'PalletMultisigTimepoint',
        multisig: 'AccountId32',
        callHash: '[u8;32]'
      }
    }
  },
  /**
   * Lookup32: pallet_multisig::Timepoint<BlockNumber>
   **/
  PalletMultisigTimepoint: {
    height: 'u32',
    index: 'u32'
  },
  /**
   * Lookup33: pallet_proxy::pallet::Event<T>
   **/
  PalletProxyEvent: {
    _enum: {
      ProxyExecuted: {
        result: 'Result<Null, SpRuntimeDispatchError>',
      },
      AnonymousCreated: {
        anonymous: 'AccountId32',
        who: 'AccountId32',
        proxyType: 'RuntimeCommonProxyType',
        disambiguationIndex: 'u16',
      },
      Announced: {
        real: 'AccountId32',
        proxy: 'AccountId32',
        callHash: 'H256',
      },
      ProxyAdded: {
        delegator: 'AccountId32',
        delegatee: 'AccountId32',
        proxyType: 'RuntimeCommonProxyType',
        delay: 'u32'
      }
    }
  },
  /**
   * Lookup34: runtime_common::ProxyType
   **/
  RuntimeCommonProxyType: {
    _enum: ['Any', 'CancelProxy', 'Governance', 'Auction', 'Swap', 'Loan']
  },
  /**
   * Lookup36: module_transaction_pause::module::Event<T>
   **/
  ModuleTransactionPauseModuleEvent: {
    _enum: {
      TransactionPaused: {
        palletNameBytes: 'Bytes',
        functionNameBytes: 'Bytes',
      },
      TransactionUnpaused: {
        palletNameBytes: 'Bytes',
        functionNameBytes: 'Bytes'
      }
    }
  },
  /**
   * Lookup37: module_idle_scheduler::module::Event<T>
   **/
  ModuleIdleSchedulerModuleEvent: {
    _enum: {
      TaskDispatched: {
        taskId: 'u32',
        result: 'Result<Null, SpRuntimeDispatchError>'
      }
    }
  },
  /**
   * Lookup38: pallet_balances::pallet::Event<T, I>
   **/
  PalletBalancesEvent: {
    _enum: {
      Endowed: {
        account: 'AccountId32',
        freeBalance: 'u128',
      },
      DustLost: {
        account: 'AccountId32',
        amount: 'u128',
      },
      Transfer: {
        from: 'AccountId32',
        to: 'AccountId32',
        amount: 'u128',
      },
      BalanceSet: {
        who: 'AccountId32',
        free: 'u128',
        reserved: 'u128',
      },
      Reserved: {
        who: 'AccountId32',
        amount: 'u128',
      },
      Unreserved: {
        who: 'AccountId32',
        amount: 'u128',
      },
      ReserveRepatriated: {
        from: 'AccountId32',
        to: 'AccountId32',
        amount: 'u128',
        destinationStatus: 'FrameSupportTokensMiscBalanceStatus',
      },
      Deposit: {
        who: 'AccountId32',
        amount: 'u128',
      },
      Withdraw: {
        who: 'AccountId32',
        amount: 'u128',
      },
      Slashed: {
        who: 'AccountId32',
        amount: 'u128'
      }
    }
  },
  /**
   * Lookup39: frame_support::traits::tokens::misc::BalanceStatus
   **/
  FrameSupportTokensMiscBalanceStatus: {
    _enum: ['Free', 'Reserved']
  },
  /**
   * Lookup40: orml_tokens::module::Event<T>
   **/
  OrmlTokensModuleEvent: {
    _enum: {
      Endowed: {
        currencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        who: 'AccountId32',
        amount: 'u128',
      },
      DustLost: {
        currencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        who: 'AccountId32',
        amount: 'u128',
      },
      Transfer: {
        currencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        from: 'AccountId32',
        to: 'AccountId32',
        amount: 'u128',
      },
      Reserved: {
        currencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        who: 'AccountId32',
        amount: 'u128',
      },
      Unreserved: {
        currencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        who: 'AccountId32',
        amount: 'u128',
      },
      RepatriatedReserve: {
        currencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        from: 'AccountId32',
        to: 'AccountId32',
        amount: 'u128',
        status: 'FrameSupportTokensMiscBalanceStatus',
      },
      BalanceSet: {
        currencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        who: 'AccountId32',
        free: 'u128',
        reserved: 'u128'
      }
    }
  },
  /**
   * Lookup41: acala_primitives::currency::CurrencyId
   **/
  AcalaPrimitivesCurrencyCurrencyId: {
    _enum: {
      Token: 'AcalaPrimitivesCurrencyTokenSymbol',
      DexShare: '(AcalaPrimitivesCurrencyDexShare,AcalaPrimitivesCurrencyDexShare)',
      Erc20: 'H160',
      StableAssetPoolToken: 'u32',
      LiquidCroadloan: 'u32',
      ForeignAsset: 'u16'
    }
  },
  /**
   * Lookup42: acala_primitives::currency::TokenSymbol
   **/
  AcalaPrimitivesCurrencyTokenSymbol: {
    _enum: ['ACA', 'AUSD', 'DOT', 'LDOT', '__Unused4', '__Unused5', '__Unused6', '__Unused7', '__Unused8', '__Unused9', '__Unused10', '__Unused11', '__Unused12', '__Unused13', '__Unused14', '__Unused15', '__Unused16', '__Unused17', '__Unused18', '__Unused19', 'RENBTC', 'CASH', '__Unused22', '__Unused23', '__Unused24', '__Unused25', '__Unused26', '__Unused27', '__Unused28', '__Unused29', '__Unused30', '__Unused31', '__Unused32', '__Unused33', '__Unused34', '__Unused35', '__Unused36', '__Unused37', '__Unused38', '__Unused39', '__Unused40', '__Unused41', '__Unused42', '__Unused43', '__Unused44', '__Unused45', '__Unused46', '__Unused47', '__Unused48', '__Unused49', '__Unused50', '__Unused51', '__Unused52', '__Unused53', '__Unused54', '__Unused55', '__Unused56', '__Unused57', '__Unused58', '__Unused59', '__Unused60', '__Unused61', '__Unused62', '__Unused63', '__Unused64', '__Unused65', '__Unused66', '__Unused67', '__Unused68', '__Unused69', '__Unused70', '__Unused71', '__Unused72', '__Unused73', '__Unused74', '__Unused75', '__Unused76', '__Unused77', '__Unused78', '__Unused79', '__Unused80', '__Unused81', '__Unused82', '__Unused83', '__Unused84', '__Unused85', '__Unused86', '__Unused87', '__Unused88', '__Unused89', '__Unused90', '__Unused91', '__Unused92', '__Unused93', '__Unused94', '__Unused95', '__Unused96', '__Unused97', '__Unused98', '__Unused99', '__Unused100', '__Unused101', '__Unused102', '__Unused103', '__Unused104', '__Unused105', '__Unused106', '__Unused107', '__Unused108', '__Unused109', '__Unused110', '__Unused111', '__Unused112', '__Unused113', '__Unused114', '__Unused115', '__Unused116', '__Unused117', '__Unused118', '__Unused119', '__Unused120', '__Unused121', '__Unused122', '__Unused123', '__Unused124', '__Unused125', '__Unused126', '__Unused127', 'KAR', 'KUSD', 'KSM', 'LKSM', 'TAI', '__Unused133', '__Unused134', '__Unused135', '__Unused136', '__Unused137', '__Unused138', '__Unused139', '__Unused140', '__Unused141', '__Unused142', '__Unused143', '__Unused144', '__Unused145', '__Unused146', '__Unused147', '__Unused148', '__Unused149', '__Unused150', '__Unused151', '__Unused152', '__Unused153', '__Unused154', '__Unused155', '__Unused156', '__Unused157', '__Unused158', '__Unused159', '__Unused160', '__Unused161', '__Unused162', '__Unused163', '__Unused164', '__Unused165', '__Unused166', '__Unused167', 'BNC', 'VSKSM', 'PHA', 'KINT', 'KBTC']
  },
  /**
   * Lookup43: acala_primitives::currency::DexShare
   **/
  AcalaPrimitivesCurrencyDexShare: {
    _enum: {
      Token: 'AcalaPrimitivesCurrencyTokenSymbol',
      Erc20: 'H160',
      LiquidCroadloan: 'u32',
      ForeignAsset: 'u16'
    }
  },
  /**
   * Lookup46: module_currencies::module::Event<T>
   **/
  ModuleCurrenciesModuleEvent: {
    _enum: {
      Transferred: {
        currencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        from: 'AccountId32',
        to: 'AccountId32',
        amount: 'u128',
      },
      BalanceUpdated: {
        currencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        who: 'AccountId32',
        amount: 'i128',
      },
      Deposited: {
        currencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        who: 'AccountId32',
        amount: 'u128',
      },
      Withdrawn: {
        currencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        who: 'AccountId32',
        amount: 'u128',
      },
      DustSwept: {
        currencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        who: 'AccountId32',
        amount: 'u128'
      }
    }
  },
  /**
   * Lookup48: orml_vesting::module::Event<T>
   **/
  OrmlVestingModuleEvent: {
    _enum: {
      VestingScheduleAdded: {
        from: 'AccountId32',
        to: 'AccountId32',
        vestingSchedule: 'OrmlVestingVestingSchedule',
      },
      Claimed: {
        who: 'AccountId32',
        amount: 'u128',
      },
      VestingSchedulesUpdated: {
        who: 'AccountId32'
      }
    }
  },
  /**
   * Lookup49: orml_vesting::VestingSchedule<BlockNumber, Balance>
   **/
  OrmlVestingVestingSchedule: {
    start: 'u32',
    period: 'u32',
    periodCount: 'u32',
    perPeriod: 'Compact<u128>'
  },
  /**
   * Lookup51: module_transaction_payment::module::Event<T>
   **/
  ModuleTransactionPaymentModuleEvent: {
    _enum: {
      SwapBalanceThresholdUpdated: {
        currencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        swapThreshold: 'u128',
      },
      ChargeFeePoolEnabled: {
        subAccount: 'AccountId32',
        currencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        exchangeRate: 'u128',
        poolSize: 'u128',
        swapThreshold: 'u128'
      }
    }
  },
  /**
   * Lookup53: pallet_treasury::pallet::Event<T, I>
   **/
  PalletTreasuryEvent: {
    _enum: {
      Proposed: 'u32',
      Spending: 'u128',
      Awarded: '(u32,u128,AccountId32)',
      Rejected: '(u32,u128)',
      Burnt: 'u128',
      Rollover: 'u128',
      Deposit: 'u128'
    }
  },
  /**
   * Lookup54: pallet_bounties::pallet::Event<T>
   **/
  PalletBountiesEvent: {
    _enum: {
      BountyProposed: {
        index: 'u32',
      },
      BountyRejected: {
        index: 'u32',
        bond: 'u128',
      },
      BountyBecameActive: {
        index: 'u32',
      },
      BountyAwarded: {
        index: 'u32',
        beneficiary: 'AccountId32',
      },
      BountyClaimed: {
        index: 'u32',
        payout: 'u128',
        beneficiary: 'AccountId32',
      },
      BountyCanceled: {
        index: 'u32',
      },
      BountyExtended: {
        index: 'u32'
      }
    }
  },
  /**
   * Lookup55: pallet_tips::pallet::Event<T>
   **/
  PalletTipsEvent: {
    _enum: {
      NewTip: {
        tipHash: 'H256',
      },
      TipClosing: {
        tipHash: 'H256',
      },
      TipClosed: {
        tipHash: 'H256',
        who: 'AccountId32',
        payout: 'u128',
      },
      TipRetracted: {
        tipHash: 'H256',
      },
      TipSlashed: {
        tipHash: 'H256',
        finder: 'AccountId32',
        deposit: 'u128'
      }
    }
  },
  /**
   * Lookup56: cumulus_pallet_parachain_system::pallet::Event<T>
   **/
  CumulusPalletParachainSystemEvent: {
    _enum: {
      ValidationFunctionStored: 'Null',
      ValidationFunctionApplied: 'u32',
      ValidationFunctionDiscarded: 'Null',
      UpgradeAuthorized: 'H256',
      DownwardMessagesReceived: 'u32',
      DownwardMessagesProcessed: '(u64,H256)'
    }
  },
  /**
   * Lookup57: module_collator_selection::pallet::Event<T>
   **/
  ModuleCollatorSelectionEvent: {
    _enum: {
      NewInvulnerables: {
        newInvulnerables: 'Vec<AccountId32>',
      },
      NewDesiredCandidates: {
        newDesiredCandidates: 'u32',
      },
      NewCandidacyBond: {
        newCandidacyBond: 'u128',
      },
      CandidateAdded: {
        who: 'AccountId32',
        bond: 'u128',
      },
      CandidateRemoved: {
        who: 'AccountId32'
      }
    }
  },
  /**
   * Lookup59: pallet_session::pallet::Event
   **/
  PalletSessionEvent: {
    _enum: {
      NewSession: {
        sessionIndex: 'u32'
      }
    }
  },
  /**
   * Lookup60: module_session_manager::module::Event<T>
   **/
  ModuleSessionManagerModuleEvent: {
    _enum: {
      ScheduledSessionDuration: {
        blockNumber: 'u32',
        sessionIndex: 'u32',
        sessionDuration: 'u32'
      }
    }
  },
  /**
   * Lookup61: cumulus_pallet_xcmp_queue::pallet::Event<T>
   **/
  CumulusPalletXcmpQueueEvent: {
    _enum: {
      Success: 'Option<H256>',
      Fail: '(Option<H256>,XcmV2TraitsError)',
      BadVersion: 'Option<H256>',
      BadFormat: 'Option<H256>',
      UpwardMessageSent: 'Option<H256>',
      XcmpMessageSent: 'Option<H256>'
    }
  },
  /**
   * Lookup63: xcm::v2::traits::Error
   **/
  XcmV2TraitsError: {
    _enum: {
      Overflow: 'Null',
      Unimplemented: 'Null',
      UntrustedReserveLocation: 'Null',
      UntrustedTeleportLocation: 'Null',
      MultiLocationFull: 'Null',
      MultiLocationNotInvertible: 'Null',
      BadOrigin: 'Null',
      InvalidLocation: 'Null',
      AssetNotFound: 'Null',
      FailedToTransactAsset: 'Null',
      NotWithdrawable: 'Null',
      LocationCannotHold: 'Null',
      ExceedsMaxMessageSize: 'Null',
      DestinationUnsupported: 'Null',
      Transport: 'Null',
      Unroutable: 'Null',
      UnknownClaim: 'Null',
      FailedToDecode: 'Null',
      TooMuchWeightRequired: 'Null',
      NotHoldingFees: 'Null',
      TooExpensive: 'Null',
      Trap: 'u64',
      UnhandledXcmVersion: 'Null',
      WeightLimitReached: 'u64',
      Barrier: 'Null',
      WeightNotComputable: 'Null'
    }
  },
  /**
   * Lookup64: pallet_xcm::pallet::Event<T>
   **/
  PalletXcmEvent: {
    _enum: {
      Attempted: 'XcmV2TraitsOutcome',
      Sent: '(XcmV1MultiLocation,XcmV1MultiLocation,XcmV2Xcm)',
      UnexpectedResponse: '(XcmV1MultiLocation,u64)',
      ResponseReady: '(u64,XcmV2Response)',
      Notified: '(u64,u8,u8)',
      NotifyOverweight: '(u64,u8,u8,u64,u64)',
      NotifyDispatchError: '(u64,u8,u8)',
      NotifyDecodeFailed: '(u64,u8,u8)',
      InvalidResponder: '(XcmV1MultiLocation,u64,Option<XcmV1MultiLocation>)',
      InvalidResponderVersion: '(XcmV1MultiLocation,u64)',
      ResponseTaken: 'u64',
      AssetsTrapped: '(H256,XcmV1MultiLocation,XcmVersionedMultiAssets)',
      VersionChangeNotified: '(XcmV1MultiLocation,u32)',
      SupportedVersionChanged: '(XcmV1MultiLocation,u32)',
      NotifyTargetSendFail: '(XcmV1MultiLocation,u64,XcmV2TraitsError)',
      NotifyTargetMigrationFail: '(XcmVersionedMultiLocation,u64)'
    }
  },
  /**
   * Lookup65: xcm::v2::traits::Outcome
   **/
  XcmV2TraitsOutcome: {
    _enum: {
      Complete: 'u64',
      Incomplete: '(u64,XcmV2TraitsError)',
      Error: 'XcmV2TraitsError'
    }
  },
  /**
   * Lookup66: xcm::v1::multilocation::MultiLocation
   **/
  XcmV1MultiLocation: {
    parents: 'u8',
    interior: 'XcmV1MultilocationJunctions'
  },
  /**
   * Lookup67: xcm::v1::multilocation::Junctions
   **/
  XcmV1MultilocationJunctions: {
    _enum: {
      Here: 'Null',
      X1: 'XcmV1Junction',
      X2: '(XcmV1Junction,XcmV1Junction)',
      X3: '(XcmV1Junction,XcmV1Junction,XcmV1Junction)',
      X4: '(XcmV1Junction,XcmV1Junction,XcmV1Junction,XcmV1Junction)',
      X5: '(XcmV1Junction,XcmV1Junction,XcmV1Junction,XcmV1Junction,XcmV1Junction)',
      X6: '(XcmV1Junction,XcmV1Junction,XcmV1Junction,XcmV1Junction,XcmV1Junction,XcmV1Junction)',
      X7: '(XcmV1Junction,XcmV1Junction,XcmV1Junction,XcmV1Junction,XcmV1Junction,XcmV1Junction,XcmV1Junction)',
      X8: '(XcmV1Junction,XcmV1Junction,XcmV1Junction,XcmV1Junction,XcmV1Junction,XcmV1Junction,XcmV1Junction,XcmV1Junction)'
    }
  },
  /**
   * Lookup68: xcm::v1::junction::Junction
   **/
  XcmV1Junction: {
    _enum: {
      Parachain: 'Compact<u32>',
      AccountId32: {
        network: 'XcmV0JunctionNetworkId',
        id: '[u8;32]',
      },
      AccountIndex64: {
        network: 'XcmV0JunctionNetworkId',
        index: 'Compact<u64>',
      },
      AccountKey20: {
        network: 'XcmV0JunctionNetworkId',
        key: '[u8;20]',
      },
      PalletInstance: 'u8',
      GeneralIndex: 'Compact<u128>',
      GeneralKey: 'Bytes',
      OnlyChild: 'Null',
      Plurality: {
        id: 'XcmV0JunctionBodyId',
        part: 'XcmV0JunctionBodyPart'
      }
    }
  },
  /**
   * Lookup70: xcm::v0::junction::NetworkId
   **/
  XcmV0JunctionNetworkId: {
    _enum: {
      Any: 'Null',
      Named: 'Bytes',
      Polkadot: 'Null',
      Kusama: 'Null'
    }
  },
  /**
   * Lookup72: xcm::v0::junction::BodyId
   **/
  XcmV0JunctionBodyId: {
    _enum: {
      Unit: 'Null',
      Named: 'Bytes',
      Index: 'Compact<u32>',
      Executive: 'Null',
      Technical: 'Null',
      Legislative: 'Null',
      Judicial: 'Null'
    }
  },
  /**
   * Lookup73: xcm::v0::junction::BodyPart
   **/
  XcmV0JunctionBodyPart: {
    _enum: {
      Voice: 'Null',
      Members: {
        count: 'Compact<u32>',
      },
      Fraction: {
        nom: 'Compact<u32>',
        denom: 'Compact<u32>',
      },
      AtLeastProportion: {
        nom: 'Compact<u32>',
        denom: 'Compact<u32>',
      },
      MoreThanProportion: {
        nom: 'Compact<u32>',
        denom: 'Compact<u32>'
      }
    }
  },
  /**
   * Lookup74: xcm::v2::Xcm<Call>
   **/
  XcmV2Xcm: 'Vec<XcmV2Instruction>',
  /**
   * Lookup76: xcm::v2::Instruction<Call>
   **/
  XcmV2Instruction: {
    _enum: {
      WithdrawAsset: 'XcmV1MultiassetMultiAssets',
      ReserveAssetDeposited: 'XcmV1MultiassetMultiAssets',
      ReceiveTeleportedAsset: 'XcmV1MultiassetMultiAssets',
      QueryResponse: {
        queryId: 'Compact<u64>',
        response: 'XcmV2Response',
        maxWeight: 'Compact<u64>',
      },
      TransferAsset: {
        assets: 'XcmV1MultiassetMultiAssets',
        beneficiary: 'XcmV1MultiLocation',
      },
      TransferReserveAsset: {
        assets: 'XcmV1MultiassetMultiAssets',
        dest: 'XcmV1MultiLocation',
        xcm: 'XcmV2Xcm',
      },
      Transact: {
        originType: 'XcmV0OriginKind',
        requireWeightAtMost: 'Compact<u64>',
        call: 'XcmDoubleEncoded',
      },
      HrmpNewChannelOpenRequest: {
        sender: 'Compact<u32>',
        maxMessageSize: 'Compact<u32>',
        maxCapacity: 'Compact<u32>',
      },
      HrmpChannelAccepted: {
        recipient: 'Compact<u32>',
      },
      HrmpChannelClosing: {
        initiator: 'Compact<u32>',
        sender: 'Compact<u32>',
        recipient: 'Compact<u32>',
      },
      ClearOrigin: 'Null',
      DescendOrigin: 'XcmV1MultilocationJunctions',
      ReportError: {
        queryId: 'Compact<u64>',
        dest: 'XcmV1MultiLocation',
        maxResponseWeight: 'Compact<u64>',
      },
      DepositAsset: {
        assets: 'XcmV1MultiassetMultiAssetFilter',
        maxAssets: 'Compact<u32>',
        beneficiary: 'XcmV1MultiLocation',
      },
      DepositReserveAsset: {
        assets: 'XcmV1MultiassetMultiAssetFilter',
        maxAssets: 'Compact<u32>',
        dest: 'XcmV1MultiLocation',
        xcm: 'XcmV2Xcm',
      },
      ExchangeAsset: {
        give: 'XcmV1MultiassetMultiAssetFilter',
        receive: 'XcmV1MultiassetMultiAssets',
      },
      InitiateReserveWithdraw: {
        assets: 'XcmV1MultiassetMultiAssetFilter',
        reserve: 'XcmV1MultiLocation',
        xcm: 'XcmV2Xcm',
      },
      InitiateTeleport: {
        assets: 'XcmV1MultiassetMultiAssetFilter',
        dest: 'XcmV1MultiLocation',
        xcm: 'XcmV2Xcm',
      },
      QueryHolding: {
        queryId: 'Compact<u64>',
        dest: 'XcmV1MultiLocation',
        assets: 'XcmV1MultiassetMultiAssetFilter',
        maxResponseWeight: 'Compact<u64>',
      },
      BuyExecution: {
        fees: 'XcmV1MultiAsset',
        weightLimit: 'XcmV2WeightLimit',
      },
      RefundSurplus: 'Null',
      SetErrorHandler: 'XcmV2Xcm',
      SetAppendix: 'XcmV2Xcm',
      ClearError: 'Null',
      ClaimAsset: {
        assets: 'XcmV1MultiassetMultiAssets',
        ticket: 'XcmV1MultiLocation',
      },
      Trap: 'Compact<u64>',
      SubscribeVersion: {
        queryId: 'Compact<u64>',
        maxResponseWeight: 'Compact<u64>',
      },
      UnsubscribeVersion: 'Null'
    }
  },
  /**
   * Lookup77: xcm::v1::multiasset::MultiAssets
   **/
  XcmV1MultiassetMultiAssets: 'Vec<XcmV1MultiAsset>',
  /**
   * Lookup79: xcm::v1::multiasset::MultiAsset
   **/
  XcmV1MultiAsset: {
    id: 'XcmV1MultiassetAssetId',
    fun: 'XcmV1MultiassetFungibility'
  },
  /**
   * Lookup80: xcm::v1::multiasset::AssetId
   **/
  XcmV1MultiassetAssetId: {
    _enum: {
      Concrete: 'XcmV1MultiLocation',
      Abstract: 'Bytes'
    }
  },
  /**
   * Lookup81: xcm::v1::multiasset::Fungibility
   **/
  XcmV1MultiassetFungibility: {
    _enum: {
      Fungible: 'Compact<u128>',
      NonFungible: 'XcmV1MultiassetAssetInstance'
    }
  },
  /**
   * Lookup82: xcm::v1::multiasset::AssetInstance
   **/
  XcmV1MultiassetAssetInstance: {
    _enum: {
      Undefined: 'Null',
      Index: 'Compact<u128>',
      Array4: '[u8;4]',
      Array8: '[u8;8]',
      Array16: '[u8;16]',
      Array32: '[u8;32]',
      Blob: 'Bytes'
    }
  },
  /**
   * Lookup85: xcm::v2::Response
   **/
  XcmV2Response: {
    _enum: {
      Null: 'Null',
      Assets: 'XcmV1MultiassetMultiAssets',
      ExecutionResult: 'Option<(u32,XcmV2TraitsError)>',
      Version: 'u32'
    }
  },
  /**
   * Lookup88: xcm::v0::OriginKind
   **/
  XcmV0OriginKind: {
    _enum: ['Native', 'SovereignAccount', 'Superuser', 'Xcm']
  },
  /**
   * Lookup89: xcm::double_encoded::DoubleEncoded<T>
   **/
  XcmDoubleEncoded: {
    encoded: 'Bytes'
  },
  /**
   * Lookup90: xcm::v1::multiasset::MultiAssetFilter
   **/
  XcmV1MultiassetMultiAssetFilter: {
    _enum: {
      Definite: 'XcmV1MultiassetMultiAssets',
      Wild: 'XcmV1MultiassetWildMultiAsset'
    }
  },
  /**
   * Lookup91: xcm::v1::multiasset::WildMultiAsset
   **/
  XcmV1MultiassetWildMultiAsset: {
    _enum: {
      All: 'Null',
      AllOf: {
        id: 'XcmV1MultiassetAssetId',
        fun: 'XcmV1MultiassetWildFungibility'
      }
    }
  },
  /**
   * Lookup92: xcm::v1::multiasset::WildFungibility
   **/
  XcmV1MultiassetWildFungibility: {
    _enum: ['Fungible', 'NonFungible']
  },
  /**
   * Lookup93: xcm::v2::WeightLimit
   **/
  XcmV2WeightLimit: {
    _enum: {
      Unlimited: 'Null',
      Limited: 'Compact<u64>'
    }
  },
  /**
   * Lookup95: xcm::VersionedMultiAssets
   **/
  XcmVersionedMultiAssets: {
    _enum: {
      V0: 'Vec<XcmV0MultiAsset>',
      V1: 'XcmV1MultiassetMultiAssets'
    }
  },
  /**
   * Lookup97: xcm::v0::multi_asset::MultiAsset
   **/
  XcmV0MultiAsset: {
    _enum: {
      None: 'Null',
      All: 'Null',
      AllFungible: 'Null',
      AllNonFungible: 'Null',
      AllAbstractFungible: {
        id: 'Bytes',
      },
      AllAbstractNonFungible: {
        class: 'Bytes',
      },
      AllConcreteFungible: {
        id: 'XcmV0MultiLocation',
      },
      AllConcreteNonFungible: {
        class: 'XcmV0MultiLocation',
      },
      AbstractFungible: {
        id: 'Bytes',
        amount: 'Compact<u128>',
      },
      AbstractNonFungible: {
        class: 'Bytes',
        instance: 'XcmV1MultiassetAssetInstance',
      },
      ConcreteFungible: {
        id: 'XcmV0MultiLocation',
        amount: 'Compact<u128>',
      },
      ConcreteNonFungible: {
        class: 'XcmV0MultiLocation',
        instance: 'XcmV1MultiassetAssetInstance'
      }
    }
  },
  /**
   * Lookup98: xcm::v0::multi_location::MultiLocation
   **/
  XcmV0MultiLocation: {
    _enum: {
      Null: 'Null',
      X1: 'XcmV0Junction',
      X2: '(XcmV0Junction,XcmV0Junction)',
      X3: '(XcmV0Junction,XcmV0Junction,XcmV0Junction)',
      X4: '(XcmV0Junction,XcmV0Junction,XcmV0Junction,XcmV0Junction)',
      X5: '(XcmV0Junction,XcmV0Junction,XcmV0Junction,XcmV0Junction,XcmV0Junction)',
      X6: '(XcmV0Junction,XcmV0Junction,XcmV0Junction,XcmV0Junction,XcmV0Junction,XcmV0Junction)',
      X7: '(XcmV0Junction,XcmV0Junction,XcmV0Junction,XcmV0Junction,XcmV0Junction,XcmV0Junction,XcmV0Junction)',
      X8: '(XcmV0Junction,XcmV0Junction,XcmV0Junction,XcmV0Junction,XcmV0Junction,XcmV0Junction,XcmV0Junction,XcmV0Junction)'
    }
  },
  /**
   * Lookup99: xcm::v0::junction::Junction
   **/
  XcmV0Junction: {
    _enum: {
      Parent: 'Null',
      Parachain: 'Compact<u32>',
      AccountId32: {
        network: 'XcmV0JunctionNetworkId',
        id: '[u8;32]',
      },
      AccountIndex64: {
        network: 'XcmV0JunctionNetworkId',
        index: 'Compact<u64>',
      },
      AccountKey20: {
        network: 'XcmV0JunctionNetworkId',
        key: '[u8;20]',
      },
      PalletInstance: 'u8',
      GeneralIndex: 'Compact<u128>',
      GeneralKey: 'Bytes',
      OnlyChild: 'Null',
      Plurality: {
        id: 'XcmV0JunctionBodyId',
        part: 'XcmV0JunctionBodyPart'
      }
    }
  },
  /**
   * Lookup100: xcm::VersionedMultiLocation
   **/
  XcmVersionedMultiLocation: {
    _enum: {
      V0: 'XcmV0MultiLocation',
      V1: 'XcmV1MultiLocation'
    }
  },
  /**
   * Lookup101: cumulus_pallet_xcm::pallet::Event<T>
   **/
  CumulusPalletXcmEvent: {
    _enum: {
      InvalidFormat: '[u8;8]',
      UnsupportedVersion: '[u8;8]',
      ExecutedDownward: '([u8;8],XcmV2TraitsOutcome)'
    }
  },
  /**
   * Lookup102: cumulus_pallet_dmp_queue::pallet::Event<T>
   **/
  CumulusPalletDmpQueueEvent: {
    _enum: {
      InvalidFormat: '[u8;32]',
      UnsupportedVersion: '[u8;32]',
      ExecutedDownward: '([u8;32],XcmV2TraitsOutcome)',
      WeightExhausted: '([u8;32],u64,u64)',
      OverweightEnqueued: '([u8;32],u64,u64)',
      OverweightServiced: '(u64,u64)'
    }
  },
  /**
   * Lookup103: orml_xtokens::module::Event<T>
   **/
  OrmlXtokensModuleEvent: {
    _enum: {
      Transferred: {
        sender: 'AccountId32',
        currencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        amount: 'u128',
        dest: 'XcmV1MultiLocation',
      },
      TransferredWithFee: {
        sender: 'AccountId32',
        currencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        amount: 'u128',
        fee: 'u128',
        dest: 'XcmV1MultiLocation',
      },
      TransferredMultiAsset: {
        sender: 'AccountId32',
        asset: 'XcmV1MultiAsset',
        dest: 'XcmV1MultiLocation',
      },
      TransferredMultiAssetWithFee: {
        sender: 'AccountId32',
        asset: 'XcmV1MultiAsset',
        fee: 'XcmV1MultiAsset',
        dest: 'XcmV1MultiLocation'
      }
    }
  },
  /**
   * Lookup104: orml_unknown_tokens::module::Event
   **/
  OrmlUnknownTokensModuleEvent: {
    _enum: {
      Deposited: {
        asset: 'XcmV1MultiAsset',
        who: 'XcmV1MultiLocation',
      },
      Withdrawn: {
        asset: 'XcmV1MultiAsset',
        who: 'XcmV1MultiLocation'
      }
    }
  },
  /**
   * Lookup105: orml_xcm::module::Event<T>
   **/
  OrmlXcmModuleEvent: {
    _enum: {
      Sent: {
        to: 'XcmV1MultiLocation',
        message: 'XcmV2Xcm'
      }
    }
  },
  /**
   * Lookup106: orml_authority::module::Event<T>
   **/
  OrmlAuthorityModuleEvent: {
    _enum: {
      Dispatched: {
        result: 'Result<Null, SpRuntimeDispatchError>',
      },
      Scheduled: {
        origin: 'KaruraRuntimeOriginCaller',
        index: 'u32',
      },
      FastTracked: {
        origin: 'KaruraRuntimeOriginCaller',
        index: 'u32',
        when: 'u32',
      },
      Delayed: {
        origin: 'KaruraRuntimeOriginCaller',
        index: 'u32',
        when: 'u32',
      },
      Cancelled: {
        origin: 'KaruraRuntimeOriginCaller',
        index: 'u32',
      },
      AuthorizedCall: {
        _alias: {
          hash_: 'hash',
        },
        hash_: 'H256',
        caller: 'Option<AccountId32>',
      },
      RemovedAuthorizedCall: {
        _alias: {
          hash_: 'hash',
        },
        hash_: 'H256',
      },
      TriggeredCallBy: {
        _alias: {
          hash_: 'hash',
        },
        hash_: 'H256',
        caller: 'AccountId32'
      }
    }
  },
  /**
   * Lookup107: karura_runtime::OriginCaller
   **/
  KaruraRuntimeOriginCaller: {
    _enum: {
      system: 'FrameSystemRawOrigin',
      __Unused1: 'Null',
      __Unused2: 'Null',
      __Unused3: 'Null',
      __Unused4: 'Null',
      __Unused5: 'Null',
      __Unused6: 'Null',
      __Unused7: 'Null',
      Void: 'SpCoreVoid',
      __Unused9: 'Null',
      __Unused10: 'Null',
      __Unused11: 'Null',
      __Unused12: 'Null',
      __Unused13: 'Null',
      __Unused14: 'Null',
      __Unused15: 'Null',
      __Unused16: 'Null',
      __Unused17: 'Null',
      __Unused18: 'Null',
      __Unused19: 'Null',
      __Unused20: 'Null',
      __Unused21: 'Null',
      __Unused22: 'Null',
      __Unused23: 'Null',
      __Unused24: 'Null',
      __Unused25: 'Null',
      __Unused26: 'Null',
      __Unused27: 'Null',
      __Unused28: 'Null',
      __Unused29: 'Null',
      __Unused30: 'Null',
      __Unused31: 'Null',
      __Unused32: 'Null',
      __Unused33: 'Null',
      __Unused34: 'Null',
      __Unused35: 'Null',
      __Unused36: 'Null',
      __Unused37: 'Null',
      __Unused38: 'Null',
      __Unused39: 'Null',
      __Unused40: 'Null',
      __Unused41: 'Null',
      __Unused42: 'Null',
      __Unused43: 'Null',
      __Unused44: 'Null',
      __Unused45: 'Null',
      __Unused46: 'Null',
      __Unused47: 'Null',
      __Unused48: 'Null',
      __Unused49: 'Null',
      __Unused50: 'Null',
      PolkadotXcm: 'PalletXcmOrigin',
      CumulusXcm: 'CumulusPalletXcmOrigin',
      __Unused53: 'Null',
      __Unused54: 'Null',
      __Unused55: 'Null',
      __Unused56: 'Null',
      __Unused57: 'Null',
      __Unused58: 'Null',
      __Unused59: 'Null',
      Authority: 'OrmlAuthorityDelayedOrigin',
      GeneralCouncil: 'PalletCollectiveRawOrigin',
      __Unused62: 'Null',
      FinancialCouncil: 'PalletCollectiveRawOrigin',
      __Unused64: 'Null',
      HomaCouncil: 'PalletCollectiveRawOrigin',
      __Unused66: 'Null',
      TechnicalCommittee: 'PalletCollectiveRawOrigin'
    }
  },
  /**
   * Lookup108: frame_system::RawOrigin<sp_core::crypto::AccountId32>
   **/
  FrameSystemRawOrigin: {
    _enum: {
      Root: 'Null',
      Signed: 'AccountId32',
      None: 'Null'
    }
  },
  /**
   * Lookup109: pallet_xcm::pallet::Origin
   **/
  PalletXcmOrigin: {
    _enum: {
      Xcm: 'XcmV1MultiLocation',
      Response: 'XcmV1MultiLocation'
    }
  },
  /**
   * Lookup110: cumulus_pallet_xcm::pallet::Origin
   **/
  CumulusPalletXcmOrigin: {
    _enum: {
      Relay: 'Null',
      SiblingParachain: 'u32'
    }
  },
  /**
   * Lookup112: orml_authority::DelayedOrigin<BlockNumber, karura_runtime::OriginCaller>
   **/
  OrmlAuthorityDelayedOrigin: {
    delay: 'u32',
    origin: 'KaruraRuntimeOriginCaller'
  },
  /**
   * Lookup113: pallet_collective::RawOrigin<sp_core::crypto::AccountId32, I>
   **/
  PalletCollectiveRawOrigin: {
    _enum: {
      Members: '(u32,u32)',
      Member: 'AccountId32',
      _Phantom: 'Null'
    }
  },
  /**
   * Lookup117: sp_core::Void
   **/
  SpCoreVoid: 'Null',
  /**
   * Lookup119: pallet_collective::pallet::Event<T, I>
   **/
  PalletCollectiveEvent: {
    _enum: {
      Proposed: {
        account: 'AccountId32',
        proposalIndex: 'u32',
        proposalHash: 'H256',
        threshold: 'u32',
      },
      Voted: {
        account: 'AccountId32',
        proposalHash: 'H256',
        voted: 'bool',
        yes: 'u32',
        no: 'u32',
      },
      Approved: {
        proposalHash: 'H256',
      },
      Disapproved: {
        proposalHash: 'H256',
      },
      Executed: {
        proposalHash: 'H256',
        result: 'Result<Null, SpRuntimeDispatchError>',
      },
      MemberExecuted: {
        proposalHash: 'H256',
        result: 'Result<Null, SpRuntimeDispatchError>',
      },
      Closed: {
        proposalHash: 'H256',
        yes: 'u32',
        no: 'u32'
      }
    }
  },
  /**
   * Lookup121: pallet_membership::pallet::Event<T, I>
   **/
  PalletMembershipEvent: {
    _enum: ['MemberAdded', 'MemberRemoved', 'MembersSwapped', 'MembersReset', 'KeyChanged', 'Dummy']
  },
  /**
   * Lookup128: pallet_democracy::pallet::Event<T>
   **/
  PalletDemocracyEvent: {
    _enum: {
      Proposed: {
        proposalIndex: 'u32',
        deposit: 'u128',
      },
      Tabled: {
        proposalIndex: 'u32',
        deposit: 'u128',
        depositors: 'Vec<AccountId32>',
      },
      ExternalTabled: 'Null',
      Started: {
        refIndex: 'u32',
        threshold: 'PalletDemocracyVoteThreshold',
      },
      Passed: {
        refIndex: 'u32',
      },
      NotPassed: {
        refIndex: 'u32',
      },
      Cancelled: {
        refIndex: 'u32',
      },
      Executed: {
        refIndex: 'u32',
        result: 'Result<Null, SpRuntimeDispatchError>',
      },
      Delegated: {
        who: 'AccountId32',
        target: 'AccountId32',
      },
      Undelegated: {
        account: 'AccountId32',
      },
      Vetoed: {
        who: 'AccountId32',
        proposalHash: 'H256',
        until: 'u32',
      },
      PreimageNoted: {
        proposalHash: 'H256',
        who: 'AccountId32',
        deposit: 'u128',
      },
      PreimageUsed: {
        proposalHash: 'H256',
        provider: 'AccountId32',
        deposit: 'u128',
      },
      PreimageInvalid: {
        proposalHash: 'H256',
        refIndex: 'u32',
      },
      PreimageMissing: {
        proposalHash: 'H256',
        refIndex: 'u32',
      },
      PreimageReaped: {
        proposalHash: 'H256',
        provider: 'AccountId32',
        deposit: 'u128',
        reaper: 'AccountId32',
      },
      Blacklisted: {
        proposalHash: 'H256'
      }
    }
  },
  /**
   * Lookup129: pallet_democracy::vote_threshold::VoteThreshold
   **/
  PalletDemocracyVoteThreshold: {
    _enum: ['SuperMajorityApprove', 'SuperMajorityAgainst', 'SimpleMajority']
  },
  /**
   * Lookup130: orml_oracle::module::Event<T, I>
   **/
  OrmlOracleModuleEvent: {
    _enum: {
      NewFeedData: {
        sender: 'AccountId32',
        values: 'Vec<(AcalaPrimitivesCurrencyCurrencyId,u128)>'
      }
    }
  },
  /**
   * Lookup134: orml_auction::module::Event<T>
   **/
  OrmlAuctionModuleEvent: {
    _enum: {
      Bid: {
        auctionId: 'u32',
        bidder: 'AccountId32',
        amount: 'u128'
      }
    }
  },
  /**
   * Lookup135: module_prices::module::Event<T>
   **/
  ModulePricesModuleEvent: {
    _enum: {
      LockPrice: {
        currencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        lockedPrice: 'u128',
      },
      UnlockPrice: {
        currencyId: 'AcalaPrimitivesCurrencyCurrencyId'
      }
    }
  },
  /**
   * Lookup136: module_dex::module::Event<T>
   **/
  ModuleDexModuleEvent: {
    _enum: {
      AddProvision: {
        who: 'AccountId32',
        currency0: 'AcalaPrimitivesCurrencyCurrencyId',
        contribution0: 'u128',
        currency1: 'AcalaPrimitivesCurrencyCurrencyId',
        contribution1: 'u128',
      },
      AddLiquidity: {
        who: 'AccountId32',
        currency0: 'AcalaPrimitivesCurrencyCurrencyId',
        pool0: 'u128',
        currency1: 'AcalaPrimitivesCurrencyCurrencyId',
        pool1: 'u128',
        shareIncrement: 'u128',
      },
      RemoveLiquidity: {
        who: 'AccountId32',
        currency0: 'AcalaPrimitivesCurrencyCurrencyId',
        pool0: 'u128',
        currency1: 'AcalaPrimitivesCurrencyCurrencyId',
        pool1: 'u128',
        shareDecrement: 'u128',
      },
      Swap: {
        trader: 'AccountId32',
        path: 'Vec<AcalaPrimitivesCurrencyCurrencyId>',
        liquidityChanges: 'Vec<u128>',
      },
      EnableTradingPair: {
        tradingPair: 'AcalaPrimitivesTradingPair',
      },
      ListProvisioning: {
        tradingPair: 'AcalaPrimitivesTradingPair',
      },
      DisableTradingPair: {
        tradingPair: 'AcalaPrimitivesTradingPair',
      },
      ProvisioningToEnabled: {
        tradingPair: 'AcalaPrimitivesTradingPair',
        pool0: 'u128',
        pool1: 'u128',
        shareAmount: 'u128'
      }
    }
  },
  /**
   * Lookup139: acala_primitives::TradingPair
   **/
  AcalaPrimitivesTradingPair: '(AcalaPrimitivesCurrencyCurrencyId,AcalaPrimitivesCurrencyCurrencyId)',
  /**
   * Lookup140: module_auction_manager::module::Event<T>
   **/
  ModuleAuctionManagerModuleEvent: {
    _enum: {
      NewCollateralAuction: {
        auctionId: 'u32',
        collateralType: 'AcalaPrimitivesCurrencyCurrencyId',
        collateralAmount: 'u128',
        targetBidPrice: 'u128',
      },
      CancelAuction: {
        auctionId: 'u32',
      },
      CollateralAuctionDealt: {
        auctionId: 'u32',
        collateralType: 'AcalaPrimitivesCurrencyCurrencyId',
        collateralAmount: 'u128',
        winner: 'AccountId32',
        paymentAmount: 'u128',
      },
      DEXTakeCollateralAuction: {
        auctionId: 'u32',
        collateralType: 'AcalaPrimitivesCurrencyCurrencyId',
        collateralAmount: 'u128',
        turnover: 'u128'
      }
    }
  },
  /**
   * Lookup141: module_loans::module::Event<T>
   **/
  ModuleLoansModuleEvent: {
    _enum: {
      PositionUpdated: {
        owner: 'AccountId32',
        collateralType: 'AcalaPrimitivesCurrencyCurrencyId',
        collateralAdjustment: 'i128',
        debitAdjustment: 'i128',
      },
      ConfiscateCollateralAndDebit: {
        owner: 'AccountId32',
        collateralType: 'AcalaPrimitivesCurrencyCurrencyId',
        confiscatedCollateralAmount: 'u128',
        deductDebitAmount: 'u128',
      },
      TransferLoan: {
        from: 'AccountId32',
        to: 'AccountId32',
        currencyId: 'AcalaPrimitivesCurrencyCurrencyId'
      }
    }
  },
  /**
   * Lookup142: module_honzon::module::Event<T>
   **/
  ModuleHonzonModuleEvent: {
    _enum: {
      Authorization: {
        authorizer: 'AccountId32',
        authorizee: 'AccountId32',
        collateralType: 'AcalaPrimitivesCurrencyCurrencyId',
      },
      UnAuthorization: {
        authorizer: 'AccountId32',
        authorizee: 'AccountId32',
        collateralType: 'AcalaPrimitivesCurrencyCurrencyId',
      },
      UnAuthorizationAll: {
        authorizer: 'AccountId32'
      }
    }
  },
  /**
   * Lookup143: module_cdp_treasury::module::Event<T>
   **/
  ModuleCdpTreasuryModuleEvent: {
    _enum: {
      ExpectedCollateralAuctionSizeUpdated: {
        collateralType: 'AcalaPrimitivesCurrencyCurrencyId',
        newSize: 'u128'
      }
    }
  },
  /**
   * Lookup144: module_cdp_engine::module::Event<T>
   **/
  ModuleCdpEngineModuleEvent: {
    _enum: {
      LiquidateUnsafeCDP: {
        collateralType: 'AcalaPrimitivesCurrencyCurrencyId',
        owner: 'AccountId32',
        collateralAmount: 'u128',
        badDebtValue: 'u128',
        liquidationStrategy: 'ModuleCdpEngineLiquidationStrategy',
      },
      SettleCDPInDebit: {
        collateralType: 'AcalaPrimitivesCurrencyCurrencyId',
        owner: 'AccountId32',
      },
      CloseCDPInDebitByDEX: {
        collateralType: 'AcalaPrimitivesCurrencyCurrencyId',
        owner: 'AccountId32',
        soldCollateralAmount: 'u128',
        refundCollateralAmount: 'u128',
        debitValue: 'u128',
      },
      InterestRatePerSecUpdated: {
        collateralType: 'AcalaPrimitivesCurrencyCurrencyId',
        newInterestRatePerSec: 'Option<u128>',
      },
      LiquidationRatioUpdated: {
        collateralType: 'AcalaPrimitivesCurrencyCurrencyId',
        newLiquidationRatio: 'Option<u128>',
      },
      LiquidationPenaltyUpdated: {
        collateralType: 'AcalaPrimitivesCurrencyCurrencyId',
        newLiquidationPenalty: 'Option<u128>',
      },
      RequiredCollateralRatioUpdated: {
        collateralType: 'AcalaPrimitivesCurrencyCurrencyId',
        newRequiredCollateralRatio: 'Option<u128>',
      },
      MaximumTotalDebitValueUpdated: {
        collateralType: 'AcalaPrimitivesCurrencyCurrencyId',
        newTotalDebitValue: 'u128',
      },
      GlobalInterestRatePerSecUpdated: {
        newGlobalInterestRatePerSec: 'u128'
      }
    }
  },
  /**
   * Lookup145: module_cdp_engine::LiquidationStrategy
   **/
  ModuleCdpEngineLiquidationStrategy: {
    _enum: {
      Auction: {
        auctionCount: 'u32',
      },
      Exchange: 'Null'
    }
  },
  /**
   * Lookup147: module_emergency_shutdown::module::Event<T>
   **/
  ModuleEmergencyShutdownModuleEvent: {
    _enum: {
      Shutdown: {
        blockNumber: 'u32',
      },
      OpenRefund: {
        blockNumber: 'u32',
      },
      Refund: {
        who: 'AccountId32',
        stableCoinAmount: 'u128',
        refundList: 'Vec<(AcalaPrimitivesCurrencyCurrencyId,u128)>'
      }
    }
  },
  /**
   * Lookup150: module_homa::module::Event<T>
   **/
  ModuleHomaModuleEvent: {
    _enum: {
      Minted: '(AccountId32,u128,u128,u128)',
      RequestedRedeem: '(AccountId32,u128,bool)',
      RedeemRequestCancelled: '(AccountId32,u128)',
      RedeemedByFastMatch: '(AccountId32,u128,u128,u128)',
      RedeemedByUnbond: '(AccountId32,u32,u128,u128)',
      WithdrawRedemption: '(AccountId32,u128)',
      CurrentEraBumped: 'u32',
      CurrentEraReset: 'u32',
      LedgerBondedReset: '(u16,u128)',
      LedgerUnlockingReset: '(u16,Vec<ModuleHomaModuleUnlockChunk>)',
      SoftBondedCapPerSubAccountUpdated: 'u128',
      EstimatedRewardRatePerEraUpdated: 'u128',
      CommissionRateUpdated: 'u128',
      FastMatchFeeRateUpdated: 'u128',
      LastEraBumpedBlockUpdated: 'u32',
      BumpEraFrequencyUpdated: 'u32'
    }
  },
  /**
   * Lookup152: module_homa::module::UnlockChunk
   **/
  ModuleHomaModuleUnlockChunk: {
    value: 'Compact<u128>',
    era: 'Compact<u32>'
  },
  /**
   * Lookup153: module_homa_xcm::module::Event<T>
   **/
  ModuleHomaXcmModuleEvent: {
    _enum: {
      XcmDestWeightUpdated: '(ModuleHomaXcmModuleHomaXcmOperation,u64)',
      XcmFeeUpdated: '(ModuleHomaXcmModuleHomaXcmOperation,u128)'
    }
  },
  /**
   * Lookup154: module_homa_xcm::module::HomaXcmOperation
   **/
  ModuleHomaXcmModuleHomaXcmOperation: {
    _enum: ['XtokensTransfer', 'XcmWithdrawUnbonded', 'XcmBondExtra', 'XcmUnbond']
  },
  /**
   * Lookup155: module_incentives::module::Event<T>
   **/
  ModuleIncentivesModuleEvent: {
    _enum: {
      DepositDexShare: {
        who: 'AccountId32',
        dexShareType: 'AcalaPrimitivesCurrencyCurrencyId',
        deposit: 'u128',
      },
      WithdrawDexShare: {
        who: 'AccountId32',
        dexShareType: 'AcalaPrimitivesCurrencyCurrencyId',
        withdraw: 'u128',
      },
      ClaimRewards: {
        who: 'AccountId32',
        pool: 'ModuleIncentivesPoolId',
        rewardCurrencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        actualAmount: 'u128',
        deductionAmount: 'u128',
      },
      IncentiveRewardAmountUpdated: {
        pool: 'ModuleIncentivesPoolId',
        rewardCurrencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        rewardAmountPerPeriod: 'u128',
      },
      SavingRewardRateUpdated: {
        pool: 'ModuleIncentivesPoolId',
        rewardRatePerPeriod: 'u128',
      },
      ClaimRewardDeductionRateUpdated: {
        pool: 'ModuleIncentivesPoolId',
        deductionRate: 'u128'
      }
    }
  },
  /**
   * Lookup156: module_incentives::PoolId
   **/
  ModuleIncentivesPoolId: {
    _enum: {
      Loans: 'AcalaPrimitivesCurrencyCurrencyId',
      Dex: 'AcalaPrimitivesCurrencyCurrencyId'
    }
  },
  /**
   * Lookup157: module_nft::module::Event<T>
   **/
  ModuleNftModuleEvent: {
    _enum: {
      CreatedClass: {
        owner: 'AccountId32',
        classId: 'u32',
      },
      MintedToken: {
        from: 'AccountId32',
        to: 'AccountId32',
        classId: 'u32',
        quantity: 'u32',
      },
      TransferredToken: {
        from: 'AccountId32',
        to: 'AccountId32',
        classId: 'u32',
        tokenId: 'u64',
      },
      BurnedToken: {
        owner: 'AccountId32',
        classId: 'u32',
        tokenId: 'u64',
      },
      BurnedTokenWithRemark: {
        owner: 'AccountId32',
        classId: 'u32',
        tokenId: 'u64',
        remarkHash: 'H256',
      },
      DestroyedClass: {
        owner: 'AccountId32',
        classId: 'u32'
      }
    }
  },
  /**
   * Lookup158: module_asset_registry::module::Event<T>
   **/
  ModuleAssetRegistryModuleEvent: {
    _enum: {
      ForeignAssetRegistered: {
        assetId: 'u16',
        assetAddress: 'XcmV1MultiLocation',
        metadata: 'ModuleAssetRegistryModuleAssetMetadata',
      },
      ForeignAssetUpdated: {
        assetId: 'u16',
        assetAddress: 'XcmV1MultiLocation',
        metadata: 'ModuleAssetRegistryModuleAssetMetadata',
      },
      AssetRegistered: {
        assetId: 'ModuleAssetRegistryModuleAssetIds',
        metadata: 'ModuleAssetRegistryModuleAssetMetadata',
      },
      AssetUpdated: {
        assetId: 'ModuleAssetRegistryModuleAssetIds',
        metadata: 'ModuleAssetRegistryModuleAssetMetadata'
      }
    }
  },
  /**
   * Lookup159: module_asset_registry::module::AssetMetadata<Balance>
   **/
  ModuleAssetRegistryModuleAssetMetadata: {
    name: 'Bytes',
    symbol: 'Bytes',
    decimals: 'u8',
    minimalBalance: 'u128'
  },
  /**
   * Lookup160: module_asset_registry::module::AssetIds
   **/
  ModuleAssetRegistryModuleAssetIds: {
    _enum: {
      Erc20: 'H160',
      StableAssetId: 'u32',
      ForeignAssetId: 'u16'
    }
  },
  /**
   * Lookup161: module_evm::module::Event<T>
   **/
  ModuleEvmModuleEvent: {
    _enum: {
      Created: {
        from: 'H160',
        contract: 'H160',
        logs: 'Vec<EthereumLog>',
      },
      CreatedFailed: {
        from: 'H160',
        contract: 'H160',
        exitReason: 'EvmCoreErrorExitReason',
        logs: 'Vec<EthereumLog>',
      },
      Executed: {
        from: 'H160',
        contract: 'H160',
        logs: 'Vec<EthereumLog>',
      },
      ExecutedFailed: {
        from: 'H160',
        contract: 'H160',
        exitReason: 'EvmCoreErrorExitReason',
        output: 'Bytes',
        logs: 'Vec<EthereumLog>',
      },
      TransferredMaintainer: {
        contract: 'H160',
        newMaintainer: 'H160',
      },
      ContractDevelopmentEnabled: {
        who: 'AccountId32',
      },
      ContractDevelopmentDisabled: {
        who: 'AccountId32',
      },
      ContractDeployed: {
        contract: 'H160',
      },
      ContractSetCode: {
        contract: 'H160',
      },
      ContractSelfdestructed: {
        contract: 'H160'
      }
    }
  },
  /**
   * Lookup163: ethereum::log::Log
   **/
  EthereumLog: {
    address: 'H160',
    topics: 'Vec<H256>',
    data: 'Bytes'
  },
  /**
   * Lookup165: evm_core::error::ExitReason
   **/
  EvmCoreErrorExitReason: {
    _enum: {
      Succeed: 'EvmCoreErrorExitSucceed',
      Error: 'EvmCoreErrorExitError',
      Revert: 'EvmCoreErrorExitRevert',
      Fatal: 'EvmCoreErrorExitFatal'
    }
  },
  /**
   * Lookup166: evm_core::error::ExitSucceed
   **/
  EvmCoreErrorExitSucceed: {
    _enum: ['Stopped', 'Returned', 'Suicided']
  },
  /**
   * Lookup167: evm_core::error::ExitError
   **/
  EvmCoreErrorExitError: {
    _enum: {
      StackUnderflow: 'Null',
      StackOverflow: 'Null',
      InvalidJump: 'Null',
      InvalidRange: 'Null',
      DesignatedInvalid: 'Null',
      CallTooDeep: 'Null',
      CreateCollision: 'Null',
      CreateContractLimit: 'Null',
      OutOfOffset: 'Null',
      OutOfGas: 'Null',
      OutOfFund: 'Null',
      PCUnderflow: 'Null',
      CreateEmpty: 'Null',
      Other: 'Text'
    }
  },
  /**
   * Lookup170: evm_core::error::ExitRevert
   **/
  EvmCoreErrorExitRevert: {
    _enum: ['Reverted']
  },
  /**
   * Lookup171: evm_core::error::ExitFatal
   **/
  EvmCoreErrorExitFatal: {
    _enum: {
      NotSupported: 'Null',
      UnhandledInterrupt: 'Null',
      CallErrorAsFatal: 'EvmCoreErrorExitError',
      Other: 'Text'
    }
  },
  /**
   * Lookup172: module_evm_accounts::module::Event<T>
   **/
  ModuleEvmAccountsModuleEvent: {
    _enum: {
      ClaimAccount: {
        accountId: 'AccountId32',
        evmAddress: 'H160'
      }
    }
  },
  /**
   * Lookup173: pallet_sudo::pallet::Event<T>
   **/
  PalletSudoEvent: {
    _enum: {
      Sudid: {
        sudoResult: 'Result<Null, SpRuntimeDispatchError>',
      },
      KeyChanged: {
        newSudoer: 'AccountId32',
      },
      SudoAsDone: {
        sudoResult: 'Result<Null, SpRuntimeDispatchError>'
      }
    }
  },
  /**
   * Lookup174: frame_system::Phase
   **/
  FrameSystemPhase: {
    _enum: {
      ApplyExtrinsic: 'u32',
      Finalization: 'Null',
      Initialization: 'Null'
    }
  },
  /**
   * Lookup176: frame_system::LastRuntimeUpgradeInfo
   **/
  FrameSystemLastRuntimeUpgradeInfo: {
    specVersion: 'Compact<u32>',
    specName: 'Text'
  },
  /**
   * Lookup177: frame_system::pallet::Call<T>
   **/
  FrameSystemCall: {
    _enum: {
      fill_block: {
        ratio: 'Perbill',
      },
      remark: {
        remark: 'Bytes',
      },
      set_heap_pages: {
        pages: 'u64',
      },
      set_code: {
        code: 'Bytes',
      },
      set_code_without_checks: {
        code: 'Bytes',
      },
      set_storage: {
        items: 'Vec<(Bytes,Bytes)>',
      },
      kill_storage: {
        _alias: {
          keys_: 'keys',
        },
        keys_: 'Vec<Bytes>',
      },
      kill_prefix: {
        prefix: 'Bytes',
        subkeys: 'u32',
      },
      remark_with_event: {
        remark: 'Bytes'
      }
    }
  },
  /**
   * Lookup182: frame_system::limits::BlockWeights
   **/
  FrameSystemLimitsBlockWeights: {
    baseBlock: 'u64',
    maxBlock: 'u64',
    perClass: 'FrameSupportWeightsPerDispatchClassWeightsPerClass'
  },
  /**
   * Lookup183: frame_support::weights::PerDispatchClass<frame_system::limits::WeightsPerClass>
   **/
  FrameSupportWeightsPerDispatchClassWeightsPerClass: {
    normal: 'FrameSystemLimitsWeightsPerClass',
    operational: 'FrameSystemLimitsWeightsPerClass',
    mandatory: 'FrameSystemLimitsWeightsPerClass'
  },
  /**
   * Lookup184: frame_system::limits::WeightsPerClass
   **/
  FrameSystemLimitsWeightsPerClass: {
    baseExtrinsic: 'u64',
    maxExtrinsic: 'Option<u64>',
    maxTotal: 'Option<u64>',
    reserved: 'Option<u64>'
  },
  /**
   * Lookup186: frame_system::limits::BlockLength
   **/
  FrameSystemLimitsBlockLength: {
    max: 'FrameSupportWeightsPerDispatchClassU32'
  },
  /**
   * Lookup187: frame_support::weights::PerDispatchClass<T>
   **/
  FrameSupportWeightsPerDispatchClassU32: {
    normal: 'u32',
    operational: 'u32',
    mandatory: 'u32'
  },
  /**
   * Lookup188: frame_support::weights::RuntimeDbWeight
   **/
  FrameSupportWeightsRuntimeDbWeight: {
    read: 'u64',
    write: 'u64'
  },
  /**
   * Lookup189: sp_version::RuntimeVersion
   **/
  SpVersionRuntimeVersion: {
    specName: 'Text',
    implName: 'Text',
    authoringVersion: 'u32',
    specVersion: 'u32',
    implVersion: 'u32',
    apis: 'Vec<([u8;8],u32)>',
    transactionVersion: 'u32'
  },
  /**
   * Lookup193: frame_system::pallet::Error<T>
   **/
  FrameSystemError: {
    _enum: ['InvalidSpecName', 'SpecVersionNeedsToIncrease', 'FailedToExtractRuntimeVersion', 'NonDefaultComposite', 'NonZeroRefCount', 'CallFiltered']
  },
  /**
   * Lookup194: pallet_timestamp::pallet::Call<T>
   **/
  PalletTimestampCall: {
    _enum: {
      set: {
        now: 'Compact<u64>'
      }
    }
  },
  /**
   * Lookup197: pallet_scheduler::ScheduledV2<karura_runtime::Call, BlockNumber, karura_runtime::OriginCaller, sp_core::crypto::AccountId32>
   **/
  PalletSchedulerScheduledV2: {
    maybeId: 'Option<Bytes>',
    priority: 'u8',
    call: 'Call',
    maybePeriodic: 'Option<(u32,u32)>',
    origin: 'KaruraRuntimeOriginCaller'
  },
  /**
   * Lookup199: pallet_scheduler::pallet::Call<T>
   **/
  PalletSchedulerCall: {
    _enum: {
      schedule: {
        when: 'u32',
        maybePeriodic: 'Option<(u32,u32)>',
        priority: 'u8',
        call: 'Call',
      },
      cancel: {
        when: 'u32',
        index: 'u32',
      },
      schedule_named: {
        id: 'Bytes',
        when: 'u32',
        maybePeriodic: 'Option<(u32,u32)>',
        priority: 'u8',
        call: 'Call',
      },
      cancel_named: {
        id: 'Bytes',
      },
      schedule_after: {
        after: 'u32',
        maybePeriodic: 'Option<(u32,u32)>',
        priority: 'u8',
        call: 'Call',
      },
      schedule_named_after: {
        id: 'Bytes',
        after: 'u32',
        maybePeriodic: 'Option<(u32,u32)>',
        priority: 'u8',
        call: 'Call'
      }
    }
  },
  /**
   * Lookup201: pallet_utility::pallet::Call<T>
   **/
  PalletUtilityCall: {
    _enum: {
      batch: {
        calls: 'Vec<Call>',
      },
      as_derivative: {
        index: 'u16',
        call: 'Call',
      },
      batch_all: {
        calls: 'Vec<Call>',
      },
      dispatch_as: {
        asOrigin: 'KaruraRuntimeOriginCaller',
        call: 'Call'
      }
    }
  },
  /**
   * Lookup203: pallet_multisig::pallet::Call<T>
   **/
  PalletMultisigCall: {
    _enum: {
      as_multi_threshold_1: {
        otherSignatories: 'Vec<AccountId32>',
        call: 'Call',
      },
      as_multi: {
        threshold: 'u16',
        otherSignatories: 'Vec<AccountId32>',
        maybeTimepoint: 'Option<PalletMultisigTimepoint>',
        call: 'Bytes',
        storeCall: 'bool',
        maxWeight: 'u64',
      },
      approve_as_multi: {
        threshold: 'u16',
        otherSignatories: 'Vec<AccountId32>',
        maybeTimepoint: 'Option<PalletMultisigTimepoint>',
        callHash: '[u8;32]',
        maxWeight: 'u64',
      },
      cancel_as_multi: {
        threshold: 'u16',
        otherSignatories: 'Vec<AccountId32>',
        timepoint: 'PalletMultisigTimepoint',
        callHash: '[u8;32]'
      }
    }
  },
  /**
   * Lookup206: pallet_proxy::pallet::Call<T>
   **/
  PalletProxyCall: {
    _enum: {
      proxy: {
        real: 'AccountId32',
        forceProxyType: 'Option<RuntimeCommonProxyType>',
        call: 'Call',
      },
      add_proxy: {
        delegate: 'AccountId32',
        proxyType: 'RuntimeCommonProxyType',
        delay: 'u32',
      },
      remove_proxy: {
        delegate: 'AccountId32',
        proxyType: 'RuntimeCommonProxyType',
        delay: 'u32',
      },
      remove_proxies: 'Null',
      anonymous: {
        proxyType: 'RuntimeCommonProxyType',
        delay: 'u32',
        index: 'u16',
      },
      kill_anonymous: {
        spawner: 'AccountId32',
        proxyType: 'RuntimeCommonProxyType',
        index: 'u16',
        height: 'Compact<u32>',
        extIndex: 'Compact<u32>',
      },
      announce: {
        real: 'AccountId32',
        callHash: 'H256',
      },
      remove_announcement: {
        real: 'AccountId32',
        callHash: 'H256',
      },
      reject_announcement: {
        delegate: 'AccountId32',
        callHash: 'H256',
      },
      proxy_announced: {
        delegate: 'AccountId32',
        real: 'AccountId32',
        forceProxyType: 'Option<RuntimeCommonProxyType>',
        call: 'Call'
      }
    }
  },
  /**
   * Lookup208: module_transaction_pause::module::Call<T>
   **/
  ModuleTransactionPauseModuleCall: {
    _enum: {
      pause_transaction: {
        palletName: 'Bytes',
        functionName: 'Bytes',
      },
      unpause_transaction: {
        palletName: 'Bytes',
        functionName: 'Bytes'
      }
    }
  },
  /**
   * Lookup209: module_idle_scheduler::module::Call<T>
   **/
  ModuleIdleSchedulerModuleCall: {
    _enum: {
      schedule_task: {
        task: 'KaruraRuntimeScheduledTasks'
      }
    }
  },
  /**
   * Lookup210: karura_runtime::ScheduledTasks
   **/
  KaruraRuntimeScheduledTasks: {
    _enum: {
      EvmTask: 'ModuleEvmEvmTask'
    }
  },
  /**
   * Lookup211: module_evm::EvmTask<karura_runtime::Runtime>
   **/
  ModuleEvmEvmTask: {
    _enum: {
      Schedule: {
        from: 'H160',
        target: 'H160',
        input: 'Bytes',
        value: 'u128',
        gasLimit: 'u64',
        storageLimit: 'u32',
      },
      Remove: {
        caller: 'H160',
        contract: 'H160',
        maintainer: 'H160'
      }
    }
  },
  /**
   * Lookup212: karura_runtime::Runtime
   **/
  KaruraRuntimeRuntime: 'Null',
  /**
   * Lookup213: pallet_balances::pallet::Call<T, I>
   **/
  PalletBalancesCall: {
    _enum: {
      transfer: {
        dest: 'MultiAddress',
        value: 'Compact<u128>',
      },
      set_balance: {
        who: 'MultiAddress',
        newFree: 'Compact<u128>',
        newReserved: 'Compact<u128>',
      },
      force_transfer: {
        source: 'MultiAddress',
        dest: 'MultiAddress',
        value: 'Compact<u128>',
      },
      transfer_keep_alive: {
        dest: 'MultiAddress',
        value: 'Compact<u128>',
      },
      transfer_all: {
        dest: 'MultiAddress',
        keepAlive: 'bool',
      },
      force_unreserve: {
        who: 'MultiAddress',
        amount: 'u128'
      }
    }
  },
  /**
   * Lookup215: module_currencies::module::Call<T>
   **/
  ModuleCurrenciesModuleCall: {
    _enum: {
      transfer: {
        dest: 'MultiAddress',
        currencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        amount: 'Compact<u128>',
      },
      transfer_native_currency: {
        dest: 'MultiAddress',
        amount: 'Compact<u128>',
      },
      update_balance: {
        who: 'MultiAddress',
        currencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        amount: 'i128',
      },
      sweep_dust: {
        currencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        accounts: 'Vec<AccountId32>'
      }
    }
  },
  /**
   * Lookup216: orml_vesting::module::Call<T>
   **/
  OrmlVestingModuleCall: {
    _enum: {
      claim: 'Null',
      vested_transfer: {
        dest: 'MultiAddress',
        schedule: 'OrmlVestingVestingSchedule',
      },
      update_vesting_schedules: {
        who: 'MultiAddress',
        vestingSchedules: 'Vec<OrmlVestingVestingSchedule>',
      },
      claim_for: {
        dest: 'MultiAddress'
      }
    }
  },
  /**
   * Lookup218: module_transaction_payment::module::Call<T>
   **/
  ModuleTransactionPaymentModuleCall: {
    _enum: {
      set_alternative_fee_swap_path: {
        feeSwapPath: 'Option<Vec<AcalaPrimitivesCurrencyCurrencyId>>',
      },
      set_swap_balance_threshold: {
        currencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        swapThreshold: 'u128',
      },
      enable_charge_fee_pool: {
        currencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        poolSize: 'u128',
        swapThreshold: 'u128'
      }
    }
  },
  /**
   * Lookup220: pallet_treasury::pallet::Call<T, I>
   **/
  PalletTreasuryCall: {
    _enum: {
      propose_spend: {
        value: 'Compact<u128>',
        beneficiary: 'MultiAddress',
      },
      reject_proposal: {
        proposalId: 'Compact<u32>',
      },
      approve_proposal: {
        proposalId: 'Compact<u32>'
      }
    }
  },
  /**
   * Lookup221: pallet_bounties::pallet::Call<T>
   **/
  PalletBountiesCall: {
    _enum: {
      propose_bounty: {
        value: 'Compact<u128>',
        description: 'Bytes',
      },
      approve_bounty: {
        bountyId: 'Compact<u32>',
      },
      propose_curator: {
        bountyId: 'Compact<u32>',
        curator: 'MultiAddress',
        fee: 'Compact<u128>',
      },
      unassign_curator: {
        bountyId: 'Compact<u32>',
      },
      accept_curator: {
        bountyId: 'Compact<u32>',
      },
      award_bounty: {
        bountyId: 'Compact<u32>',
        beneficiary: 'MultiAddress',
      },
      claim_bounty: {
        bountyId: 'Compact<u32>',
      },
      close_bounty: {
        bountyId: 'Compact<u32>',
      },
      extend_bounty_expiry: {
        bountyId: 'Compact<u32>',
        remark: 'Bytes'
      }
    }
  },
  /**
   * Lookup222: pallet_tips::pallet::Call<T>
   **/
  PalletTipsCall: {
    _enum: {
      report_awesome: {
        reason: 'Bytes',
        who: 'AccountId32',
      },
      retract_tip: {
        _alias: {
          hash_: 'hash',
        },
        hash_: 'H256',
      },
      tip_new: {
        reason: 'Bytes',
        who: 'AccountId32',
        tipValue: 'Compact<u128>',
      },
      tip: {
        _alias: {
          hash_: 'hash',
        },
        hash_: 'H256',
        tipValue: 'Compact<u128>',
      },
      close_tip: {
        _alias: {
          hash_: 'hash',
        },
        hash_: 'H256',
      },
      slash_tip: {
        _alias: {
          hash_: 'hash',
        },
        hash_: 'H256'
      }
    }
  },
  /**
   * Lookup223: cumulus_pallet_parachain_system::pallet::Call<T>
   **/
  CumulusPalletParachainSystemCall: {
    _enum: {
      set_validation_data: {
        data: 'CumulusPrimitivesParachainInherentParachainInherentData',
      },
      sudo_send_upward_message: {
        message: 'Bytes',
      },
      authorize_upgrade: {
        codeHash: 'H256',
      },
      enact_authorized_upgrade: {
        code: 'Bytes'
      }
    }
  },
  /**
   * Lookup224: cumulus_primitives_parachain_inherent::ParachainInherentData
   **/
  CumulusPrimitivesParachainInherentParachainInherentData: {
    validationData: 'PolkadotPrimitivesV1PersistedValidationData',
    relayChainState: 'SpTrieStorageProof',
    downwardMessages: 'Vec<PolkadotCorePrimitivesInboundDownwardMessage>',
    horizontalMessages: 'BTreeMap<u32, Vec<PolkadotCorePrimitivesInboundHrmpMessage>>'
  },
  /**
   * Lookup225: polkadot_primitives::v1::PersistedValidationData<primitive_types::H256, N>
   **/
  PolkadotPrimitivesV1PersistedValidationData: {
    parentHead: 'Bytes',
    relayParentNumber: 'u32',
    relayParentStorageRoot: 'H256',
    maxPovSize: 'u32'
  },
  /**
   * Lookup227: sp_trie::storage_proof::StorageProof
   **/
  SpTrieStorageProof: {
    trieNodes: 'Vec<Bytes>'
  },
  /**
   * Lookup229: polkadot_core_primitives::InboundDownwardMessage<BlockNumber>
   **/
  PolkadotCorePrimitivesInboundDownwardMessage: {
    sentAt: 'u32',
    msg: 'Bytes'
  },
  /**
   * Lookup232: polkadot_core_primitives::InboundHrmpMessage<BlockNumber>
   **/
  PolkadotCorePrimitivesInboundHrmpMessage: {
    sentAt: 'u32',
    data: 'Bytes'
  },
  /**
   * Lookup235: module_collator_selection::pallet::Call<T>
   **/
  ModuleCollatorSelectionCall: {
    _enum: {
      set_invulnerables: {
        _alias: {
          new_: 'new',
        },
        new_: 'Vec<AccountId32>',
      },
      set_desired_candidates: {
        max: 'Compact<u32>',
      },
      set_candidacy_bond: {
        bond: 'Compact<u128>',
      },
      register_as_candidate: 'Null',
      register_candidate: {
        newCandidate: 'AccountId32',
      },
      leave_intent: 'Null',
      withdraw_bond: 'Null'
    }
  },
  /**
   * Lookup236: pallet_session::pallet::Call<T>
   **/
  PalletSessionCall: {
    _enum: {
      set_keys: {
        _alias: {
          keys_: 'keys',
        },
        keys_: 'KaruraRuntimeSessionKeys',
        proof: 'Bytes',
      },
      purge_keys: 'Null'
    }
  },
  /**
   * Lookup237: karura_runtime::SessionKeys
   **/
  KaruraRuntimeSessionKeys: {
    aura: 'SpConsensusAuraSr25519AppSr25519Public'
  },
  /**
   * Lookup238: sp_consensus_aura::sr25519::app_sr25519::Public
   **/
  SpConsensusAuraSr25519AppSr25519Public: 'SpCoreSr25519Public',
  /**
   * Lookup239: sp_core::sr25519::Public
   **/
  SpCoreSr25519Public: '[u8;32]',
  /**
   * Lookup240: module_session_manager::module::Call<T>
   **/
  ModuleSessionManagerModuleCall: {
    _enum: {
      schedule_session_duration: {
        startSession: 'Compact<u32>',
        duration: 'Compact<u32>'
      }
    }
  },
  /**
   * Lookup241: pallet_xcm::pallet::Call<T>
   **/
  PalletXcmCall: {
    _enum: {
      send: {
        dest: 'XcmVersionedMultiLocation',
        message: 'XcmVersionedXcm',
      },
      teleport_assets: {
        dest: 'XcmVersionedMultiLocation',
        beneficiary: 'XcmVersionedMultiLocation',
        assets: 'XcmVersionedMultiAssets',
        feeAssetItem: 'u32',
      },
      reserve_transfer_assets: {
        dest: 'XcmVersionedMultiLocation',
        beneficiary: 'XcmVersionedMultiLocation',
        assets: 'XcmVersionedMultiAssets',
        feeAssetItem: 'u32',
      },
      execute: {
        message: 'XcmVersionedXcm',
        maxWeight: 'u64',
      },
      force_xcm_version: {
        location: 'XcmV1MultiLocation',
        xcmVersion: 'u32',
      },
      force_default_xcm_version: {
        maybeXcmVersion: 'Option<u32>',
      },
      force_subscribe_version_notify: {
        location: 'XcmVersionedMultiLocation',
      },
      force_unsubscribe_version_notify: {
        location: 'XcmVersionedMultiLocation',
      },
      limited_reserve_transfer_assets: {
        dest: 'XcmVersionedMultiLocation',
        beneficiary: 'XcmVersionedMultiLocation',
        assets: 'XcmVersionedMultiAssets',
        feeAssetItem: 'u32',
        weightLimit: 'XcmV2WeightLimit',
      },
      limited_teleport_assets: {
        dest: 'XcmVersionedMultiLocation',
        beneficiary: 'XcmVersionedMultiLocation',
        assets: 'XcmVersionedMultiAssets',
        feeAssetItem: 'u32',
        weightLimit: 'XcmV2WeightLimit'
      }
    }
  },
  /**
   * Lookup242: xcm::VersionedXcm<Call>
   **/
  XcmVersionedXcm: {
    _enum: {
      V0: 'XcmV0Xcm',
      V1: 'XcmV1Xcm',
      V2: 'XcmV2Xcm'
    }
  },
  /**
   * Lookup243: xcm::v0::Xcm<Call>
   **/
  XcmV0Xcm: {
    _enum: {
      WithdrawAsset: {
        assets: 'Vec<XcmV0MultiAsset>',
        effects: 'Vec<XcmV0Order>',
      },
      ReserveAssetDeposit: {
        assets: 'Vec<XcmV0MultiAsset>',
        effects: 'Vec<XcmV0Order>',
      },
      TeleportAsset: {
        assets: 'Vec<XcmV0MultiAsset>',
        effects: 'Vec<XcmV0Order>',
      },
      QueryResponse: {
        queryId: 'Compact<u64>',
        response: 'XcmV0Response',
      },
      TransferAsset: {
        assets: 'Vec<XcmV0MultiAsset>',
        dest: 'XcmV0MultiLocation',
      },
      TransferReserveAsset: {
        assets: 'Vec<XcmV0MultiAsset>',
        dest: 'XcmV0MultiLocation',
        effects: 'Vec<XcmV0Order>',
      },
      Transact: {
        originType: 'XcmV0OriginKind',
        requireWeightAtMost: 'u64',
        call: 'XcmDoubleEncoded',
      },
      HrmpNewChannelOpenRequest: {
        sender: 'Compact<u32>',
        maxMessageSize: 'Compact<u32>',
        maxCapacity: 'Compact<u32>',
      },
      HrmpChannelAccepted: {
        recipient: 'Compact<u32>',
      },
      HrmpChannelClosing: {
        initiator: 'Compact<u32>',
        sender: 'Compact<u32>',
        recipient: 'Compact<u32>',
      },
      RelayedFrom: {
        who: 'XcmV0MultiLocation',
        message: 'XcmV0Xcm'
      }
    }
  },
  /**
   * Lookup245: xcm::v0::order::Order<Call>
   **/
  XcmV0Order: {
    _enum: {
      Null: 'Null',
      DepositAsset: {
        assets: 'Vec<XcmV0MultiAsset>',
        dest: 'XcmV0MultiLocation',
      },
      DepositReserveAsset: {
        assets: 'Vec<XcmV0MultiAsset>',
        dest: 'XcmV0MultiLocation',
        effects: 'Vec<XcmV0Order>',
      },
      ExchangeAsset: {
        give: 'Vec<XcmV0MultiAsset>',
        receive: 'Vec<XcmV0MultiAsset>',
      },
      InitiateReserveWithdraw: {
        assets: 'Vec<XcmV0MultiAsset>',
        reserve: 'XcmV0MultiLocation',
        effects: 'Vec<XcmV0Order>',
      },
      InitiateTeleport: {
        assets: 'Vec<XcmV0MultiAsset>',
        dest: 'XcmV0MultiLocation',
        effects: 'Vec<XcmV0Order>',
      },
      QueryHolding: {
        queryId: 'Compact<u64>',
        dest: 'XcmV0MultiLocation',
        assets: 'Vec<XcmV0MultiAsset>',
      },
      BuyExecution: {
        fees: 'XcmV0MultiAsset',
        weight: 'u64',
        debt: 'u64',
        haltOnError: 'bool',
        xcm: 'Vec<XcmV0Xcm>'
      }
    }
  },
  /**
   * Lookup247: xcm::v0::Response
   **/
  XcmV0Response: {
    _enum: {
      Assets: 'Vec<XcmV0MultiAsset>'
    }
  },
  /**
   * Lookup248: xcm::v1::Xcm<Call>
   **/
  XcmV1Xcm: {
    _enum: {
      WithdrawAsset: {
        assets: 'XcmV1MultiassetMultiAssets',
        effects: 'Vec<XcmV1Order>',
      },
      ReserveAssetDeposited: {
        assets: 'XcmV1MultiassetMultiAssets',
        effects: 'Vec<XcmV1Order>',
      },
      ReceiveTeleportedAsset: {
        assets: 'XcmV1MultiassetMultiAssets',
        effects: 'Vec<XcmV1Order>',
      },
      QueryResponse: {
        queryId: 'Compact<u64>',
        response: 'XcmV1Response',
      },
      TransferAsset: {
        assets: 'XcmV1MultiassetMultiAssets',
        beneficiary: 'XcmV1MultiLocation',
      },
      TransferReserveAsset: {
        assets: 'XcmV1MultiassetMultiAssets',
        dest: 'XcmV1MultiLocation',
        effects: 'Vec<XcmV1Order>',
      },
      Transact: {
        originType: 'XcmV0OriginKind',
        requireWeightAtMost: 'u64',
        call: 'XcmDoubleEncoded',
      },
      HrmpNewChannelOpenRequest: {
        sender: 'Compact<u32>',
        maxMessageSize: 'Compact<u32>',
        maxCapacity: 'Compact<u32>',
      },
      HrmpChannelAccepted: {
        recipient: 'Compact<u32>',
      },
      HrmpChannelClosing: {
        initiator: 'Compact<u32>',
        sender: 'Compact<u32>',
        recipient: 'Compact<u32>',
      },
      RelayedFrom: {
        who: 'XcmV1MultilocationJunctions',
        message: 'XcmV1Xcm',
      },
      SubscribeVersion: {
        queryId: 'Compact<u64>',
        maxResponseWeight: 'Compact<u64>',
      },
      UnsubscribeVersion: 'Null'
    }
  },
  /**
   * Lookup250: xcm::v1::order::Order<Call>
   **/
  XcmV1Order: {
    _enum: {
      Noop: 'Null',
      DepositAsset: {
        assets: 'XcmV1MultiassetMultiAssetFilter',
        maxAssets: 'u32',
        beneficiary: 'XcmV1MultiLocation',
      },
      DepositReserveAsset: {
        assets: 'XcmV1MultiassetMultiAssetFilter',
        maxAssets: 'u32',
        dest: 'XcmV1MultiLocation',
        effects: 'Vec<XcmV1Order>',
      },
      ExchangeAsset: {
        give: 'XcmV1MultiassetMultiAssetFilter',
        receive: 'XcmV1MultiassetMultiAssets',
      },
      InitiateReserveWithdraw: {
        assets: 'XcmV1MultiassetMultiAssetFilter',
        reserve: 'XcmV1MultiLocation',
        effects: 'Vec<XcmV1Order>',
      },
      InitiateTeleport: {
        assets: 'XcmV1MultiassetMultiAssetFilter',
        dest: 'XcmV1MultiLocation',
        effects: 'Vec<XcmV1Order>',
      },
      QueryHolding: {
        queryId: 'Compact<u64>',
        dest: 'XcmV1MultiLocation',
        assets: 'XcmV1MultiassetMultiAssetFilter',
      },
      BuyExecution: {
        fees: 'XcmV1MultiAsset',
        weight: 'u64',
        debt: 'u64',
        haltOnError: 'bool',
        instructions: 'Vec<XcmV1Xcm>'
      }
    }
  },
  /**
   * Lookup252: xcm::v1::Response
   **/
  XcmV1Response: {
    _enum: {
      Assets: 'XcmV1MultiassetMultiAssets',
      Version: 'u32'
    }
  },
  /**
   * Lookup267: cumulus_pallet_dmp_queue::pallet::Call<T>
   **/
  CumulusPalletDmpQueueCall: {
    _enum: {
      service_overweight: {
        index: 'u64',
        weightLimit: 'u64'
      }
    }
  },
  /**
   * Lookup268: orml_xtokens::module::Call<T>
   **/
  OrmlXtokensModuleCall: {
    _enum: {
      transfer: {
        currencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        amount: 'u128',
        dest: 'XcmVersionedMultiLocation',
        destWeight: 'u64',
      },
      transfer_multiasset: {
        asset: 'XcmVersionedMultiAsset',
        dest: 'XcmVersionedMultiLocation',
        destWeight: 'u64',
      },
      transfer_with_fee: {
        currencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        amount: 'u128',
        fee: 'u128',
        dest: 'XcmVersionedMultiLocation',
        destWeight: 'u64',
      },
      transfer_multiasset_with_fee: {
        asset: 'XcmVersionedMultiAsset',
        fee: 'XcmVersionedMultiAsset',
        dest: 'XcmVersionedMultiLocation',
        destWeight: 'u64'
      }
    }
  },
  /**
   * Lookup269: xcm::VersionedMultiAsset
   **/
  XcmVersionedMultiAsset: {
    _enum: {
      V0: 'XcmV0MultiAsset',
      V1: 'XcmV1MultiAsset'
    }
  },
  /**
   * Lookup270: orml_xcm::module::Call<T>
   **/
  OrmlXcmModuleCall: {
    _enum: {
      send_as_sovereign: {
        dest: 'XcmVersionedMultiLocation',
        message: 'XcmVersionedXcm'
      }
    }
  },
  /**
   * Lookup271: orml_authority::module::Call<T>
   **/
  OrmlAuthorityModuleCall: {
    _enum: {
      dispatch_as: {
        asOrigin: 'AcalaPrimitivesAuthoritysOriginId',
        call: 'Call',
      },
      schedule_dispatch: {
        when: 'FrameSupportScheduleDispatchTime',
        priority: 'u8',
        withDelayedOrigin: 'bool',
        call: 'Call',
      },
      fast_track_scheduled_dispatch: {
        initialOrigin: 'KaruraRuntimeOriginCaller',
        taskId: 'u32',
        when: 'FrameSupportScheduleDispatchTime',
      },
      delay_scheduled_dispatch: {
        initialOrigin: 'KaruraRuntimeOriginCaller',
        taskId: 'u32',
        additionalDelay: 'u32',
      },
      cancel_scheduled_dispatch: {
        initialOrigin: 'KaruraRuntimeOriginCaller',
        taskId: 'u32',
      },
      authorize_call: {
        call: 'Call',
        caller: 'Option<AccountId32>',
      },
      remove_authorized_call: {
        _alias: {
          hash_: 'hash',
        },
        hash_: 'H256',
      },
      trigger_call: {
        _alias: {
          hash_: 'hash',
        },
        hash_: 'H256',
        callWeightBound: 'Compact<u64>'
      }
    }
  },
  /**
   * Lookup272: acala_primitives::AuthoritysOriginId
   **/
  AcalaPrimitivesAuthoritysOriginId: {
    _enum: ['Root', 'Treasury', 'HonzonTreasury', 'HomaTreasury', 'TreasuryReserve']
  },
  /**
   * Lookup273: frame_support::traits::schedule::DispatchTime<BlockNumber>
   **/
  FrameSupportScheduleDispatchTime: {
    _enum: {
      At: 'u32',
      After: 'u32'
    }
  },
  /**
   * Lookup274: pallet_collective::pallet::Call<T, I>
   **/
  PalletCollectiveCall: {
    _enum: {
      set_members: {
        newMembers: 'Vec<AccountId32>',
        prime: 'Option<AccountId32>',
        oldCount: 'u32',
      },
      execute: {
        proposal: 'Call',
        lengthBound: 'Compact<u32>',
      },
      propose: {
        threshold: 'Compact<u32>',
        proposal: 'Call',
        lengthBound: 'Compact<u32>',
      },
      vote: {
        proposal: 'H256',
        index: 'Compact<u32>',
        approve: 'bool',
      },
      close: {
        proposalHash: 'H256',
        index: 'Compact<u32>',
        proposalWeightBound: 'Compact<u64>',
        lengthBound: 'Compact<u32>',
      },
      disapprove_proposal: {
        proposalHash: 'H256'
      }
    }
  },
  /**
   * Lookup275: pallet_membership::pallet::Call<T, I>
   **/
  PalletMembershipCall: {
    _enum: {
      add_member: {
        who: 'AccountId32',
      },
      remove_member: {
        who: 'AccountId32',
      },
      swap_member: {
        remove: 'AccountId32',
        add: 'AccountId32',
      },
      reset_members: {
        members: 'Vec<AccountId32>',
      },
      change_key: {
        _alias: {
          new_: 'new',
        },
        new_: 'AccountId32',
      },
      set_prime: {
        who: 'AccountId32',
      },
      clear_prime: 'Null'
    }
  },
  /**
   * Lookup282: pallet_democracy::pallet::Call<T>
   **/
  PalletDemocracyCall: {
    _enum: {
      propose: {
        proposalHash: 'H256',
        value: 'Compact<u128>',
      },
      second: {
        proposal: 'Compact<u32>',
        secondsUpperBound: 'Compact<u32>',
      },
      vote: {
        refIndex: 'Compact<u32>',
        vote: 'PalletDemocracyVoteAccountVote',
      },
      emergency_cancel: {
        refIndex: 'u32',
      },
      external_propose: {
        proposalHash: 'H256',
      },
      external_propose_majority: {
        proposalHash: 'H256',
      },
      external_propose_default: {
        proposalHash: 'H256',
      },
      fast_track: {
        proposalHash: 'H256',
        votingPeriod: 'u32',
        delay: 'u32',
      },
      veto_external: {
        proposalHash: 'H256',
      },
      cancel_referendum: {
        refIndex: 'Compact<u32>',
      },
      cancel_queued: {
        which: 'u32',
      },
      delegate: {
        to: 'AccountId32',
        conviction: 'PalletDemocracyConviction',
        balance: 'u128',
      },
      undelegate: 'Null',
      clear_public_proposals: 'Null',
      note_preimage: {
        encodedProposal: 'Bytes',
      },
      note_preimage_operational: {
        encodedProposal: 'Bytes',
      },
      note_imminent_preimage: {
        encodedProposal: 'Bytes',
      },
      note_imminent_preimage_operational: {
        encodedProposal: 'Bytes',
      },
      reap_preimage: {
        proposalHash: 'H256',
        proposalLenUpperBound: 'Compact<u32>',
      },
      unlock: {
        target: 'AccountId32',
      },
      remove_vote: {
        index: 'u32',
      },
      remove_other_vote: {
        target: 'AccountId32',
        index: 'u32',
      },
      enact_proposal: {
        proposalHash: 'H256',
        index: 'u32',
      },
      blacklist: {
        proposalHash: 'H256',
        maybeRefIndex: 'Option<u32>',
      },
      cancel_proposal: {
        propIndex: 'Compact<u32>'
      }
    }
  },
  /**
   * Lookup283: pallet_democracy::vote::AccountVote<Balance>
   **/
  PalletDemocracyVoteAccountVote: {
    _enum: {
      Standard: {
        vote: 'Vote',
        balance: 'u128',
      },
      Split: {
        aye: 'u128',
        nay: 'u128'
      }
    }
  },
  /**
   * Lookup285: pallet_democracy::conviction::Conviction
   **/
  PalletDemocracyConviction: {
    _enum: ['None', 'Locked1x', 'Locked2x', 'Locked3x', 'Locked4x', 'Locked5x', 'Locked6x']
  },
  /**
   * Lookup286: orml_oracle::module::Call<T, I>
   **/
  OrmlOracleModuleCall: {
    _enum: {
      feed_values: {
        values: 'Vec<(AcalaPrimitivesCurrencyCurrencyId,u128)>'
      }
    }
  },
  /**
   * Lookup288: orml_auction::module::Call<T>
   **/
  OrmlAuctionModuleCall: {
    _enum: {
      bid: {
        id: 'u32',
        value: 'Compact<u128>'
      }
    }
  },
  /**
   * Lookup289: orml_rewards::module::Call<T>
   **/
  OrmlRewardsModuleCall: 'Null',
  /**
   * Lookup290: module_prices::module::Call<T>
   **/
  ModulePricesModuleCall: {
    _enum: {
      lock_price: {
        currencyId: 'AcalaPrimitivesCurrencyCurrencyId',
      },
      unlock_price: {
        currencyId: 'AcalaPrimitivesCurrencyCurrencyId'
      }
    }
  },
  /**
   * Lookup291: module_dex::module::Call<T>
   **/
  ModuleDexModuleCall: {
    _enum: {
      swap_with_exact_supply: {
        path: 'Vec<AcalaPrimitivesCurrencyCurrencyId>',
        supplyAmount: 'Compact<u128>',
        minTargetAmount: 'Compact<u128>',
      },
      swap_with_exact_target: {
        path: 'Vec<AcalaPrimitivesCurrencyCurrencyId>',
        targetAmount: 'Compact<u128>',
        maxSupplyAmount: 'Compact<u128>',
      },
      add_liquidity: {
        currencyIdA: 'AcalaPrimitivesCurrencyCurrencyId',
        currencyIdB: 'AcalaPrimitivesCurrencyCurrencyId',
        maxAmountA: 'Compact<u128>',
        maxAmountB: 'Compact<u128>',
        minShareIncrement: 'Compact<u128>',
        stakeIncrementShare: 'bool',
      },
      add_provision: {
        currencyIdA: 'AcalaPrimitivesCurrencyCurrencyId',
        currencyIdB: 'AcalaPrimitivesCurrencyCurrencyId',
        amountA: 'Compact<u128>',
        amountB: 'Compact<u128>',
      },
      claim_dex_share: {
        owner: 'AccountId32',
        currencyIdA: 'AcalaPrimitivesCurrencyCurrencyId',
        currencyIdB: 'AcalaPrimitivesCurrencyCurrencyId',
      },
      remove_liquidity: {
        currencyIdA: 'AcalaPrimitivesCurrencyCurrencyId',
        currencyIdB: 'AcalaPrimitivesCurrencyCurrencyId',
        removeShare: 'Compact<u128>',
        minWithdrawnA: 'Compact<u128>',
        minWithdrawnB: 'Compact<u128>',
        byUnstake: 'bool',
      },
      list_provisioning: {
        currencyIdA: 'AcalaPrimitivesCurrencyCurrencyId',
        currencyIdB: 'AcalaPrimitivesCurrencyCurrencyId',
        minContributionA: 'Compact<u128>',
        minContributionB: 'Compact<u128>',
        targetProvisionA: 'Compact<u128>',
        targetProvisionB: 'Compact<u128>',
        notBefore: 'Compact<u32>',
      },
      update_provisioning_parameters: {
        currencyIdA: 'AcalaPrimitivesCurrencyCurrencyId',
        currencyIdB: 'AcalaPrimitivesCurrencyCurrencyId',
        minContributionA: 'Compact<u128>',
        minContributionB: 'Compact<u128>',
        targetProvisionA: 'Compact<u128>',
        targetProvisionB: 'Compact<u128>',
        notBefore: 'Compact<u32>',
      },
      end_provisioning: {
        currencyIdA: 'AcalaPrimitivesCurrencyCurrencyId',
        currencyIdB: 'AcalaPrimitivesCurrencyCurrencyId',
      },
      enable_trading_pair: {
        currencyIdA: 'AcalaPrimitivesCurrencyCurrencyId',
        currencyIdB: 'AcalaPrimitivesCurrencyCurrencyId',
      },
      disable_trading_pair: {
        currencyIdA: 'AcalaPrimitivesCurrencyCurrencyId',
        currencyIdB: 'AcalaPrimitivesCurrencyCurrencyId'
      }
    }
  },
  /**
   * Lookup292: module_auction_manager::module::Call<T>
   **/
  ModuleAuctionManagerModuleCall: {
    _enum: {
      cancel: {
        id: 'u32'
      }
    }
  },
  /**
   * Lookup293: module_loans::module::Call<T>
   **/
  ModuleLoansModuleCall: 'Null',
  /**
   * Lookup294: module_honzon::module::Call<T>
   **/
  ModuleHonzonModuleCall: {
    _enum: {
      adjust_loan: {
        currencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        collateralAdjustment: 'i128',
        debitAdjustment: 'i128',
      },
      close_loan_has_debit_by_dex: {
        currencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        maxCollateralAmount: 'Compact<u128>',
      },
      transfer_loan_from: {
        currencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        from: 'MultiAddress',
      },
      authorize: {
        currencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        to: 'MultiAddress',
      },
      unauthorize: {
        currencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        to: 'MultiAddress',
      },
      unauthorize_all: 'Null'
    }
  },
  /**
   * Lookup295: module_cdp_treasury::module::Call<T>
   **/
  ModuleCdpTreasuryModuleCall: {
    _enum: {
      extract_surplus_to_treasury: {
        amount: 'Compact<u128>',
      },
      auction_collateral: {
        currencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        amount: 'Compact<u128>',
        target: 'Compact<u128>',
        splited: 'bool',
      },
      set_expected_collateral_auction_size: {
        _alias: {
          size_: 'size',
        },
        currencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        size_: 'Compact<u128>'
      }
    }
  },
  /**
   * Lookup296: module_cdp_engine::module::Call<T>
   **/
  ModuleCdpEngineModuleCall: {
    _enum: {
      liquidate: {
        currencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        who: 'MultiAddress',
      },
      settle: {
        currencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        who: 'MultiAddress',
      },
      set_global_params: {
        globalInterestRatePerSec: 'u128',
      },
      set_collateral_params: {
        currencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        interestRatePerSec: 'OrmlTraitsChangeOption',
        liquidationRatio: 'OrmlTraitsChangeOption',
        liquidationPenalty: 'OrmlTraitsChangeOption',
        requiredCollateralRatio: 'OrmlTraitsChangeOption',
        maximumTotalDebitValue: 'OrmlTraitsChangeU128'
      }
    }
  },
  /**
   * Lookup297: orml_traits::Change<Option<sp_arithmetic::fixed_point::FixedU128>>
   **/
  OrmlTraitsChangeOption: {
    _enum: {
      NoChange: 'Null',
      NewValue: 'Option<u128>'
    }
  },
  /**
   * Lookup298: orml_traits::Change<Value>
   **/
  OrmlTraitsChangeU128: {
    _enum: {
      NoChange: 'Null',
      NewValue: 'u128'
    }
  },
  /**
   * Lookup299: module_emergency_shutdown::module::Call<T>
   **/
  ModuleEmergencyShutdownModuleCall: {
    _enum: {
      emergency_shutdown: 'Null',
      open_collateral_refund: 'Null',
      refund_collaterals: {
        amount: 'Compact<u128>'
      }
    }
  },
  /**
   * Lookup300: module_homa::module::Call<T>
   **/
  ModuleHomaModuleCall: {
    _enum: {
      mint: {
        amount: 'Compact<u128>',
      },
      request_redeem: {
        amount: 'Compact<u128>',
        allowFastMatch: 'bool',
      },
      fast_match_redeems: {
        redeemerList: 'Vec<AccountId32>',
      },
      claim_redemption: {
        redeemer: 'AccountId32',
      },
      update_homa_params: {
        softBondedCapPerSubAccount: 'Option<u128>',
        estimatedRewardRatePerEra: 'Option<u128>',
        commissionRate: 'Option<u128>',
        fastMatchFeeRate: 'Option<u128>',
      },
      update_bump_era_params: {
        lastEraBumpedBlock: 'Option<u32>',
        frequency: 'Option<u32>',
      },
      reset_ledgers: {
        updates: 'Vec<(u16,Option<u128>,Option<Vec<ModuleHomaModuleUnlockChunk>>)>',
      },
      reset_current_era: {
        eraIndex: 'u32'
      }
    }
  },
  /**
   * Lookup305: module_homa_xcm::module::Call<T>
   **/
  ModuleHomaXcmModuleCall: {
    _enum: {
      update_xcm_dest_weight_and_fee: {
        updates: 'Vec<(ModuleHomaXcmModuleHomaXcmOperation,Option<u64>,Option<u128>)>'
      }
    }
  },
  /**
   * Lookup308: module_incentives::module::Call<T>
   **/
  ModuleIncentivesModuleCall: {
    _enum: {
      deposit_dex_share: {
        lpCurrencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        amount: 'Compact<u128>',
      },
      withdraw_dex_share: {
        lpCurrencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        amount: 'Compact<u128>',
      },
      claim_rewards: {
        poolId: 'ModuleIncentivesPoolId',
      },
      update_incentive_rewards: {
        updates: 'Vec<(ModuleIncentivesPoolId,Vec<(AcalaPrimitivesCurrencyCurrencyId,u128)>)>',
      },
      update_dex_saving_rewards: {
        updates: 'Vec<(ModuleIncentivesPoolId,u128)>',
      },
      update_claim_reward_deduction_rates: {
        updates: 'Vec<(ModuleIncentivesPoolId,u128)>'
      }
    }
  },
  /**
   * Lookup313: module_nft::module::Call<T>
   **/
  ModuleNftModuleCall: {
    _enum: {
      create_class: {
        metadata: 'Bytes',
        properties: 'u8',
        attributes: 'BTreeMap<Bytes, Bytes>',
      },
      mint: {
        to: 'MultiAddress',
        classId: 'u32',
        metadata: 'Bytes',
        attributes: 'BTreeMap<Bytes, Bytes>',
        quantity: 'Compact<u32>',
      },
      transfer: {
        to: 'MultiAddress',
        token: '(u32,u64)',
      },
      burn: {
        token: '(u32,u64)',
      },
      burn_with_remark: {
        token: '(u32,u64)',
        remark: 'Bytes',
      },
      destroy_class: {
        classId: 'u32',
        dest: 'MultiAddress',
      },
      update_class_properties: {
        classId: 'u32',
        properties: 'u8'
      }
    }
  },
  /**
   * Lookup315: module_nft::ClassProperty
   **/
  ModuleNftClassProperty: {
    _enum: ['__Unused0', 'Transferable', 'Burnable', '__Unused3', 'Mintable', '__Unused5', '__Unused6', '__Unused7', 'ClassPropertiesMutable']
  },
  /**
   * Lookup318: module_asset_registry::module::Call<T>
   **/
  ModuleAssetRegistryModuleCall: {
    _enum: {
      register_foreign_asset: {
        location: 'XcmVersionedMultiLocation',
        metadata: 'ModuleAssetRegistryModuleAssetMetadata',
      },
      update_foreign_asset: {
        foreignAssetId: 'u16',
        location: 'XcmVersionedMultiLocation',
        metadata: 'ModuleAssetRegistryModuleAssetMetadata',
      },
      register_stable_asset: {
        metadata: 'ModuleAssetRegistryModuleAssetMetadata',
      },
      update_stable_asset: {
        stableAssetId: 'u32',
        metadata: 'ModuleAssetRegistryModuleAssetMetadata',
      },
      register_erc20_asset: {
        contract: 'H160',
        minimalBalance: 'u128',
      },
      update_erc20_asset: {
        contract: 'H160',
        metadata: 'ModuleAssetRegistryModuleAssetMetadata'
      }
    }
  },
  /**
   * Lookup319: module_evm::module::Call<T>
   **/
  ModuleEvmModuleCall: {
    _enum: {
      eth_call: {
        action: 'EthereumTransactionTransactionAction',
        input: 'Bytes',
        value: 'Compact<u128>',
        gasLimit: 'Compact<u64>',
        storageLimit: 'Compact<u32>',
        validUntil: 'Compact<u32>',
      },
      call: {
        target: 'H160',
        input: 'Bytes',
        value: 'Compact<u128>',
        gasLimit: 'Compact<u64>',
        storageLimit: 'Compact<u32>',
      },
      scheduled_call: {
        from: 'H160',
        target: 'H160',
        input: 'Bytes',
        value: 'Compact<u128>',
        gasLimit: 'Compact<u64>',
        storageLimit: 'Compact<u32>',
      },
      create: {
        init: 'Bytes',
        value: 'Compact<u128>',
        gasLimit: 'Compact<u64>',
        storageLimit: 'Compact<u32>',
      },
      create2: {
        init: 'Bytes',
        salt: 'H256',
        value: 'Compact<u128>',
        gasLimit: 'Compact<u64>',
        storageLimit: 'Compact<u32>',
      },
      create_nft_contract: {
        init: 'Bytes',
        value: 'Compact<u128>',
        gasLimit: 'Compact<u64>',
        storageLimit: 'Compact<u32>',
      },
      create_predeploy_contract: {
        target: 'H160',
        init: 'Bytes',
        value: 'Compact<u128>',
        gasLimit: 'Compact<u64>',
        storageLimit: 'Compact<u32>',
      },
      transfer_maintainer: {
        contract: 'H160',
        newMaintainer: 'H160',
      },
      deploy: {
        contract: 'H160',
      },
      deploy_free: {
        contract: 'H160',
      },
      enable_contract_development: 'Null',
      disable_contract_development: 'Null',
      set_code: {
        contract: 'H160',
        code: 'Bytes',
      },
      selfdestruct: {
        contract: 'H160'
      }
    }
  },
  /**
   * Lookup320: ethereum::transaction::TransactionAction
   **/
  EthereumTransactionTransactionAction: {
    _enum: {
      Call: 'H160',
      Create: 'Null'
    }
  },
  /**
   * Lookup321: module_evm_accounts::module::Call<T>
   **/
  ModuleEvmAccountsModuleCall: {
    _enum: {
      claim_account: {
        ethAddress: 'H160',
        ethSignature: 'SpCoreEcdsaSignature',
      },
      claim_default_account: 'Null'
    }
  },
  /**
   * Lookup322: sp_core::ecdsa::Signature
   **/
  SpCoreEcdsaSignature: '[u8;65]',
  /**
   * Lookup324: pallet_sudo::pallet::Call<T>
   **/
  PalletSudoCall: {
    _enum: {
      sudo: {
        call: 'Call',
      },
      sudo_unchecked_weight: {
        call: 'Call',
        weight: 'u64',
      },
      set_key: {
        _alias: {
          new_: 'new',
        },
        new_: 'MultiAddress',
      },
      sudo_as: {
        who: 'MultiAddress',
        call: 'Call'
      }
    }
  },
  /**
   * Lookup325: pallet_scheduler::Releases
   **/
  PalletSchedulerReleases: {
    _enum: ['V1', 'V2']
  },
  /**
   * Lookup326: pallet_scheduler::pallet::Error<T>
   **/
  PalletSchedulerError: {
    _enum: ['FailedToSchedule', 'NotFound', 'TargetBlockNumberInPast', 'RescheduleNoChange']
  },
  /**
   * Lookup327: pallet_utility::pallet::Error<T>
   **/
  PalletUtilityError: {
    _enum: ['TooManyCalls']
  },
  /**
   * Lookup329: pallet_multisig::Multisig<BlockNumber, Balance, sp_core::crypto::AccountId32>
   **/
  PalletMultisigMultisig: {
    when: 'PalletMultisigTimepoint',
    deposit: 'u128',
    depositor: 'AccountId32',
    approvals: 'Vec<AccountId32>'
  },
  /**
   * Lookup331: pallet_multisig::pallet::Error<T>
   **/
  PalletMultisigError: {
    _enum: ['MinimumThreshold', 'AlreadyApproved', 'NoApprovalsNeeded', 'TooFewSignatories', 'TooManySignatories', 'SignatoriesOutOfOrder', 'SenderInSignatories', 'NotFound', 'NotOwner', 'NoTimepoint', 'WrongTimepoint', 'UnexpectedTimepoint', 'MaxWeightTooLow', 'AlreadyStored']
  },
  /**
   * Lookup334: pallet_proxy::ProxyDefinition<sp_core::crypto::AccountId32, runtime_common::ProxyType, BlockNumber>
   **/
  PalletProxyProxyDefinition: {
    delegate: 'AccountId32',
    proxyType: 'RuntimeCommonProxyType',
    delay: 'u32'
  },
  /**
   * Lookup338: pallet_proxy::Announcement<sp_core::crypto::AccountId32, primitive_types::H256, BlockNumber>
   **/
  PalletProxyAnnouncement: {
    real: 'AccountId32',
    callHash: 'H256',
    height: 'u32'
  },
  /**
   * Lookup340: pallet_proxy::pallet::Error<T>
   **/
  PalletProxyError: {
    _enum: ['TooMany', 'NotFound', 'NotProxy', 'Unproxyable', 'Duplicate', 'NoPermission', 'Unannounced', 'NoSelfProxy']
  },
  /**
   * Lookup341: module_transaction_pause::module::Error<T>
   **/
  ModuleTransactionPauseModuleError: {
    _enum: ['CannotPause', 'InvalidCharacter']
  },
  /**
   * Lookup343: pallet_balances::BalanceLock<Balance>
   **/
  PalletBalancesBalanceLock: {
    id: '[u8;8]',
    amount: 'u128',
    reasons: 'PalletBalancesReasons'
  },
  /**
   * Lookup344: pallet_balances::Reasons
   **/
  PalletBalancesReasons: {
    _enum: ['Fee', 'Misc', 'All']
  },
  /**
   * Lookup347: pallet_balances::ReserveData<acala_primitives::ReserveIdentifier, Balance>
   **/
  PalletBalancesReserveData: {
    id: 'AcalaPrimitivesReserveIdentifier',
    amount: 'u128'
  },
  /**
   * Lookup348: acala_primitives::ReserveIdentifier
   **/
  AcalaPrimitivesReserveIdentifier: {
    _enum: ['CollatorSelection', 'EvmStorageDeposit', 'EvmDeveloperDeposit', 'Honzon', 'Nft', 'TransactionPayment', 'TransactionPaymentDeposit', 'Count']
  },
  /**
   * Lookup350: pallet_balances::Releases
   **/
  PalletBalancesReleases: {
    _enum: ['V1_0_0', 'V2_0_0']
  },
  /**
   * Lookup351: pallet_balances::pallet::Error<T, I>
   **/
  PalletBalancesError: {
    _enum: ['VestingBalance', 'LiquidityRestrictions', 'InsufficientBalance', 'ExistentialDeposit', 'KeepAlive', 'ExistingVestingSchedule', 'DeadAccount', 'TooManyReserves']
  },
  /**
   * Lookup354: orml_tokens::BalanceLock<Balance>
   **/
  OrmlTokensBalanceLock: {
    id: '[u8;8]',
    amount: 'u128'
  },
  /**
   * Lookup356: orml_tokens::AccountData<Balance>
   **/
  OrmlTokensAccountData: {
    free: 'u128',
    reserved: 'u128',
    frozen: 'u128'
  },
  /**
   * Lookup357: orml_tokens::module::Error<T>
   **/
  OrmlTokensModuleError: {
    _enum: ['BalanceTooLow', 'AmountIntoBalanceFailed', 'LiquidityRestrictions', 'MaxLocksExceeded', 'KeepAlive', 'ExistentialDeposit', 'DeadAccount']
  },
  /**
   * Lookup358: module_currencies::module::Error<T>
   **/
  ModuleCurrenciesModuleError: {
    _enum: ['AmountIntoBalanceFailed', 'BalanceTooLow', 'Erc20InvalidOperation', 'EvmAccountNotFound', 'RealOriginNotFound', 'DepositFailed']
  },
  /**
   * Lookup360: orml_vesting::module::Error<T>
   **/
  OrmlVestingModuleError: {
    _enum: ['ZeroVestingPeriod', 'ZeroVestingPeriodCount', 'InsufficientBalanceToLock', 'TooManyVestingSchedules', 'AmountLow', 'MaxVestingSchedulesExceeded']
  },
  /**
   * Lookup363: frame_support::PalletId
   **/
  FrameSupportPalletId: '[u8;8]',
  /**
   * Lookup365: frame_support::weights::WeightToFeeCoefficient<Balance>
   **/
  FrameSupportWeightsWeightToFeeCoefficient: {
    coeffInteger: 'u128',
    coeffFrac: 'Perbill',
    negative: 'bool',
    degree: 'u8'
  },
  /**
   * Lookup366: module_transaction_payment::module::Error<T>
   **/
  ModuleTransactionPaymentModuleError: {
    _enum: ['InvalidSwapPath', 'InvalidBalance', 'InvalidRate', 'DexNotAvailable', 'ChargeFeePoolAlreadyExisted']
  },
  /**
   * Lookup367: pallet_treasury::Proposal<sp_core::crypto::AccountId32, Balance>
   **/
  PalletTreasuryProposal: {
    proposer: 'AccountId32',
    value: 'u128',
    beneficiary: 'AccountId32',
    bond: 'u128'
  },
  /**
   * Lookup371: pallet_treasury::pallet::Error<T, I>
   **/
  PalletTreasuryError: {
    _enum: ['InsufficientProposersBalance', 'InvalidIndex', 'TooManyApprovals']
  },
  /**
   * Lookup372: pallet_bounties::Bounty<sp_core::crypto::AccountId32, Balance, BlockNumber>
   **/
  PalletBountiesBounty: {
    proposer: 'AccountId32',
    value: 'u128',
    fee: 'u128',
    curatorDeposit: 'u128',
    bond: 'u128',
    status: 'PalletBountiesBountyStatus'
  },
  /**
   * Lookup373: pallet_bounties::BountyStatus<sp_core::crypto::AccountId32, BlockNumber>
   **/
  PalletBountiesBountyStatus: {
    _enum: {
      Proposed: 'Null',
      Approved: 'Null',
      Funded: 'Null',
      CuratorProposed: {
        curator: 'AccountId32',
      },
      Active: {
        curator: 'AccountId32',
        updateDue: 'u32',
      },
      PendingPayout: {
        curator: 'AccountId32',
        beneficiary: 'AccountId32',
        unlockAt: 'u32'
      }
    }
  },
  /**
   * Lookup374: pallet_bounties::pallet::Error<T>
   **/
  PalletBountiesError: {
    _enum: ['InsufficientProposersBalance', 'InvalidIndex', 'ReasonTooBig', 'UnexpectedStatus', 'RequireCurator', 'InvalidValue', 'InvalidFee', 'PendingPayout', 'Premature']
  },
  /**
   * Lookup375: pallet_tips::OpenTip<sp_core::crypto::AccountId32, Balance, BlockNumber, primitive_types::H256>
   **/
  PalletTipsOpenTip: {
    reason: 'H256',
    who: 'AccountId32',
    finder: 'AccountId32',
    deposit: 'u128',
    closes: 'Option<u32>',
    tips: 'Vec<(AccountId32,u128)>',
    findersFee: 'bool'
  },
  /**
   * Lookup379: pallet_tips::pallet::Error<T>
   **/
  PalletTipsError: {
    _enum: ['ReasonTooBig', 'AlreadyKnown', 'UnknownTip', 'NotFinder', 'StillOpen', 'Premature']
  },
  /**
   * Lookup381: polkadot_primitives::v1::UpgradeRestriction
   **/
  PolkadotPrimitivesV1UpgradeRestriction: {
    _enum: ['Present']
  },
  /**
   * Lookup382: cumulus_pallet_parachain_system::relay_state_snapshot::MessagingStateSnapshot
   **/
  CumulusPalletParachainSystemRelayStateSnapshotMessagingStateSnapshot: {
    dmqMqcHead: 'H256',
    relayDispatchQueueSize: '(u32,u32)',
    ingressChannels: 'Vec<(u32,PolkadotPrimitivesV1AbridgedHrmpChannel)>',
    egressChannels: 'Vec<(u32,PolkadotPrimitivesV1AbridgedHrmpChannel)>'
  },
  /**
   * Lookup385: polkadot_primitives::v1::AbridgedHrmpChannel
   **/
  PolkadotPrimitivesV1AbridgedHrmpChannel: {
    maxCapacity: 'u32',
    maxTotalSize: 'u32',
    maxMessageSize: 'u32',
    msgCount: 'u32',
    totalSize: 'u32',
    mqcHead: 'Option<H256>'
  },
  /**
   * Lookup386: polkadot_primitives::v1::AbridgedHostConfiguration
   **/
  PolkadotPrimitivesV1AbridgedHostConfiguration: {
    maxCodeSize: 'u32',
    maxHeadDataSize: 'u32',
    maxUpwardQueueCount: 'u32',
    maxUpwardQueueSize: 'u32',
    maxUpwardMessageSize: 'u32',
    maxUpwardMessageNumPerCandidate: 'u32',
    hrmpMaxMessageNumPerCandidate: 'u32',
    validationUpgradeFrequency: 'u32',
    validationUpgradeDelay: 'u32'
  },
  /**
   * Lookup392: polkadot_core_primitives::OutboundHrmpMessage<polkadot_parachain::primitives::Id>
   **/
  PolkadotCorePrimitivesOutboundHrmpMessage: {
    recipient: 'u32',
    data: 'Bytes'
  },
  /**
   * Lookup393: cumulus_pallet_parachain_system::pallet::Error<T>
   **/
  CumulusPalletParachainSystemError: {
    _enum: ['OverlappingUpgrades', 'ProhibitedByPolkadot', 'TooBig', 'ValidationDataNotAvailable', 'HostConfigurationNotAvailable', 'NotScheduled', 'NothingAuthorized', 'Unauthorized']
  },
  /**
   * Lookup395: pallet_authorship::UncleEntryItem<BlockNumber, primitive_types::H256, sp_core::crypto::AccountId32>
   **/
  PalletAuthorshipUncleEntryItem: {
    _enum: {
      InclusionHeight: 'u32',
      Uncle: '(H256,Option<AccountId32>)'
    }
  },
  /**
   * Lookup396: pallet_authorship::pallet::Error<T>
   **/
  PalletAuthorshipError: {
    _enum: ['InvalidUncleParent', 'UnclesAlreadySet', 'TooManyUncles', 'GenesisUncle', 'TooHighUncle', 'UncleAlreadyIncluded', 'OldUncle']
  },
  /**
   * Lookup398: frame_support::storage::bounded_btree_set::BoundedBTreeSet<sp_core::crypto::AccountId32, S>
   **/
  FrameSupportStorageBoundedBTreeSet: 'BTreeSet',
  /**
   * Lookup399: BTreeSet<sp_core::crypto::AccountId32>
   **/
  BTreeSet: 'Vec<AccountId32>',
  /**
   * Lookup400: module_collator_selection::pallet::Error<T>
   **/
  ModuleCollatorSelectionError: {
    _enum: ['MaxCandidatesExceeded', 'BelowCandidatesMin', 'StillLocked', 'Unknown', 'Permission', 'AlreadyCandidate', 'NotCandidate', 'NotNonCandidate', 'NothingToWithdraw', 'RequireSessionKey', 'AlreadyInvulnerable', 'InvalidProof', 'MaxInvulnerablesExceeded']
  },
  /**
   * Lookup404: sp_core::crypto::KeyTypeId
   **/
  SpCoreCryptoKeyTypeId: '[u8;4]',
  /**
   * Lookup405: pallet_session::pallet::Error<T>
   **/
  PalletSessionError: {
    _enum: ['InvalidProof', 'NoAssociatedValidatorId', 'DuplicatedKey', 'NoKeys', 'NoAccount']
  },
  /**
   * Lookup409: module_session_manager::module::Error<T>
   **/
  ModuleSessionManagerModuleError: {
    _enum: ['InvalidSession', 'InvalidDuration', 'EstimateNextSessionFailed']
  },
  /**
   * Lookup412: cumulus_pallet_xcmp_queue::InboundStatus
   **/
  CumulusPalletXcmpQueueInboundStatus: {
    _enum: ['Ok', 'Suspended']
  },
  /**
   * Lookup415: polkadot_parachain::primitives::XcmpMessageFormat
   **/
  PolkadotParachainPrimitivesXcmpMessageFormat: {
    _enum: ['ConcatenatedVersionedXcm', 'ConcatenatedEncodedBlob', 'Signals']
  },
  /**
   * Lookup419: cumulus_pallet_xcmp_queue::OutboundStatus
   **/
  CumulusPalletXcmpQueueOutboundStatus: {
    _enum: ['Ok', 'Suspended']
  },
  /**
   * Lookup421: cumulus_pallet_xcmp_queue::QueueConfigData
   **/
  CumulusPalletXcmpQueueQueueConfigData: {
    suspendThreshold: 'u32',
    dropThreshold: 'u32',
    resumeThreshold: 'u32',
    thresholdWeight: 'u64',
    weightRestrictDecay: 'u64'
  },
  /**
   * Lookup422: cumulus_pallet_xcmp_queue::pallet::Error<T>
   **/
  CumulusPalletXcmpQueueError: {
    _enum: ['FailedToSend', 'BadXcmOrigin', 'BadXcm']
  },
  /**
   * Lookup423: pallet_xcm::pallet::QueryStatus<BlockNumber>
   **/
  PalletXcmQueryStatus: {
    _enum: {
      Pending: {
        responder: 'XcmVersionedMultiLocation',
        maybeNotify: 'Option<(u8,u8)>',
        timeout: 'u32',
      },
      VersionNotifier: {
        origin: 'XcmVersionedMultiLocation',
        isActive: 'bool',
      },
      Ready: {
        response: 'XcmVersionedResponse',
        at: 'u32'
      }
    }
  },
  /**
   * Lookup426: xcm::VersionedResponse
   **/
  XcmVersionedResponse: {
    _enum: {
      V0: 'XcmV0Response',
      V1: 'XcmV1Response',
      V2: 'XcmV2Response'
    }
  },
  /**
   * Lookup432: pallet_xcm::pallet::VersionMigrationStage
   **/
  PalletXcmVersionMigrationStage: {
    _enum: {
      MigrateSupportedVersion: 'Null',
      MigrateVersionNotifiers: 'Null',
      NotifyCurrentTargets: 'Option<Bytes>',
      MigrateAndNotifyOldTargets: 'Null'
    }
  },
  /**
   * Lookup433: pallet_xcm::pallet::Error<T>
   **/
  PalletXcmError: {
    _enum: ['Unreachable', 'SendFailure', 'Filtered', 'UnweighableMessage', 'DestinationNotInvertible', 'Empty', 'CannotReanchor', 'TooManyAssets', 'InvalidOrigin', 'BadVersion', 'BadLocation', 'NoSubscription', 'AlreadySubscribed']
  },
  /**
   * Lookup434: cumulus_pallet_xcm::pallet::Error<T>
   **/
  CumulusPalletXcmError: 'Null',
  /**
   * Lookup435: cumulus_pallet_dmp_queue::ConfigData
   **/
  CumulusPalletDmpQueueConfigData: {
    maxIndividual: 'u64'
  },
  /**
   * Lookup436: cumulus_pallet_dmp_queue::PageIndexData
   **/
  CumulusPalletDmpQueuePageIndexData: {
    beginUsed: 'u32',
    endUsed: 'u32',
    overweightCount: 'u64'
  },
  /**
   * Lookup439: cumulus_pallet_dmp_queue::pallet::Error<T>
   **/
  CumulusPalletDmpQueueError: {
    _enum: ['Unknown', 'OverLimit']
  },
  /**
   * Lookup440: orml_xtokens::module::Error<T>
   **/
  OrmlXtokensModuleError: {
    _enum: ['AssetHasNoReserve', 'NotCrossChainTransfer', 'InvalidDest', 'NotCrossChainTransferableCurrency', 'UnweighableMessage', 'XcmExecutionFailed', 'CannotReanchor', 'InvalidAncestry', 'NotFungible', 'DestinationNotInvertible', 'BadVersion', 'DistincAssetAndFeeId', 'FeeCannotBeZero']
  },
  /**
   * Lookup443: orml_unknown_tokens::module::Error<T>
   **/
  OrmlUnknownTokensModuleError: {
    _enum: ['BalanceTooLow', 'BalanceOverflow', 'UnhandledAsset']
  },
  /**
   * Lookup444: orml_xcm::module::Error<T>
   **/
  OrmlXcmModuleError: {
    _enum: ['Unreachable', 'SendFailure', 'BadVersion']
  },
  /**
   * Lookup446: orml_authority::module::Error<T>
   **/
  OrmlAuthorityModuleError: {
    _enum: ['FailedToSchedule', 'FailedToCancel', 'FailedToFastTrack', 'FailedToDelay', 'CallNotAuthorized', 'TriggerCallNotPermitted', 'WrongCallWeightBound']
  },
  /**
   * Lookup448: pallet_collective::Votes<sp_core::crypto::AccountId32, BlockNumber>
   **/
  PalletCollectiveVotes: {
    index: 'u32',
    threshold: 'u32',
    ayes: 'Vec<AccountId32>',
    nays: 'Vec<AccountId32>',
    end: 'u32'
  },
  /**
   * Lookup449: pallet_collective::pallet::Error<T, I>
   **/
  PalletCollectiveError: {
    _enum: ['NotMember', 'DuplicateProposal', 'ProposalMissing', 'WrongIndex', 'DuplicateVote', 'AlreadyInitialized', 'TooEarly', 'TooManyProposals', 'WrongProposalWeight', 'WrongProposalLength']
  },
  /**
   * Lookup450: pallet_membership::pallet::Error<T, I>
   **/
  PalletMembershipError: {
    _enum: ['AlreadyMember', 'NotMember']
  },
  /**
   * Lookup463: pallet_democracy::PreimageStatus<sp_core::crypto::AccountId32, Balance, BlockNumber>
   **/
  PalletDemocracyPreimageStatus: {
    _enum: {
      Missing: 'u32',
      Available: {
        data: 'Bytes',
        provider: 'AccountId32',
        deposit: 'u128',
        since: 'u32',
        expiry: 'Option<u32>'
      }
    }
  },
  /**
   * Lookup464: pallet_democracy::types::ReferendumInfo<BlockNumber, primitive_types::H256, Balance>
   **/
  PalletDemocracyReferendumInfo: {
    _enum: {
      Ongoing: 'PalletDemocracyReferendumStatus',
      Finished: {
        approved: 'bool',
        end: 'u32'
      }
    }
  },
  /**
   * Lookup465: pallet_democracy::types::ReferendumStatus<BlockNumber, primitive_types::H256, Balance>
   **/
  PalletDemocracyReferendumStatus: {
    end: 'u32',
    proposalHash: 'H256',
    threshold: 'PalletDemocracyVoteThreshold',
    delay: 'u32',
    tally: 'PalletDemocracyTally'
  },
  /**
   * Lookup466: pallet_democracy::types::Tally<Balance>
   **/
  PalletDemocracyTally: {
    ayes: 'u128',
    nays: 'u128',
    turnout: 'u128'
  },
  /**
   * Lookup467: pallet_democracy::vote::Voting<Balance, sp_core::crypto::AccountId32, BlockNumber>
   **/
  PalletDemocracyVoteVoting: {
    _enum: {
      Direct: {
        votes: 'Vec<(u32,PalletDemocracyVoteAccountVote)>',
        delegations: 'PalletDemocracyDelegations',
        prior: 'PalletDemocracyVotePriorLock',
      },
      Delegating: {
        balance: 'u128',
        target: 'AccountId32',
        conviction: 'PalletDemocracyConviction',
        delegations: 'PalletDemocracyDelegations',
        prior: 'PalletDemocracyVotePriorLock'
      }
    }
  },
  /**
   * Lookup470: pallet_democracy::types::Delegations<Balance>
   **/
  PalletDemocracyDelegations: {
    votes: 'u128',
    capital: 'u128'
  },
  /**
   * Lookup471: pallet_democracy::vote::PriorLock<BlockNumber, Balance>
   **/
  PalletDemocracyVotePriorLock: '(u32,u128)',
  /**
   * Lookup474: pallet_democracy::Releases
   **/
  PalletDemocracyReleases: {
    _enum: ['V1']
  },
  /**
   * Lookup475: pallet_democracy::pallet::Error<T>
   **/
  PalletDemocracyError: {
    _enum: ['ValueLow', 'ProposalMissing', 'AlreadyCanceled', 'DuplicateProposal', 'ProposalBlacklisted', 'NotSimpleMajority', 'InvalidHash', 'NoProposal', 'AlreadyVetoed', 'DuplicatePreimage', 'NotImminent', 'TooEarly', 'Imminent', 'PreimageMissing', 'ReferendumInvalid', 'PreimageInvalid', 'NoneWaiting', 'NotVoter', 'NoPermission', 'AlreadyDelegating', 'InsufficientFunds', 'NotDelegating', 'VotesExist', 'InstantNotAllowed', 'Nonsense', 'WrongUpperBound', 'MaxVotesReached', 'TooManyProposals']
  },
  /**
   * Lookup476: orml_oracle::module::TimestampedValue<sp_arithmetic::fixed_point::FixedU128, Moment>
   **/
  OrmlOracleModuleTimestampedValue: {
    value: 'u128',
    timestamp: 'u64'
  },
  /**
   * Lookup477: orml_utilities::ordered_set::OrderedSet<sp_core::crypto::AccountId32, S>
   **/
  OrmlUtilitiesOrderedSet: 'Vec<AccountId32>',
  /**
   * Lookup479: orml_oracle::module::Error<T, I>
   **/
  OrmlOracleModuleError: {
    _enum: ['NoPermission', 'AlreadyFeeded']
  },
  /**
   * Lookup481: orml_traits::auction::AuctionInfo<sp_core::crypto::AccountId32, Balance, BlockNumber>
   **/
  OrmlTraitsAuctionAuctionInfo: {
    bid: 'Option<(AccountId32,u128)>',
    start: 'u32',
    end: 'Option<u32>'
  },
  /**
   * Lookup483: orml_auction::module::Error<T>
   **/
  OrmlAuctionModuleError: {
    _enum: ['AuctionNotExist', 'AuctionNotStarted', 'BidNotAccepted', 'InvalidBidPrice', 'NoAvailableAuctionId']
  },
  /**
   * Lookup484: orml_rewards::PoolInfo<Share, Balance, acala_primitives::currency::CurrencyId>
   **/
  OrmlRewardsPoolInfo: {
    totalShares: 'u128',
    rewards: 'BTreeMap<AcalaPrimitivesCurrencyCurrencyId, (u128,u128)>'
  },
  /**
   * Lookup492: orml_rewards::module::Error<T>
   **/
  OrmlRewardsModuleError: {
    _enum: ['PoolDoesNotExist']
  },
  /**
   * Lookup493: orml_nft::ClassInfo<TokenId, sp_core::crypto::AccountId32, module_nft::ClassData<Balance>, frame_support::storage::bounded_vec::BoundedVec<T, S>>
   **/
  OrmlNftClassInfo: {
    metadata: 'Bytes',
    totalIssuance: 'u64',
    owner: 'AccountId32',
    data: 'ModuleNftClassData'
  },
  /**
   * Lookup494: module_nft::ClassData<Balance>
   **/
  ModuleNftClassData: {
    deposit: 'u128',
    properties: 'u8',
    attributes: 'BTreeMap<Bytes, Bytes>'
  },
  /**
   * Lookup496: orml_nft::TokenInfo<sp_core::crypto::AccountId32, module_nft::TokenData<Balance>, frame_support::storage::bounded_vec::BoundedVec<T, S>>
   **/
  OrmlNftTokenInfo: {
    metadata: 'Bytes',
    owner: 'AccountId32',
    data: 'ModuleNftTokenData'
  },
  /**
   * Lookup497: module_nft::TokenData<Balance>
   **/
  ModuleNftTokenData: {
    deposit: 'u128',
    attributes: 'BTreeMap<Bytes, Bytes>'
  },
  /**
   * Lookup500: orml_nft::module::Error<T>
   **/
  OrmlNftModuleError: {
    _enum: ['NoAvailableClassId', 'NoAvailableTokenId', 'TokenNotFound', 'ClassNotFound', 'NoPermission', 'CannotDestroyClass', 'MaxMetadataExceeded']
  },
  /**
   * Lookup501: module_prices::module::Error<T>
   **/
  ModulePricesModuleError: {
    _enum: ['AccessPriceFailed', 'NoLockedPrice']
  },
  /**
   * Lookup502: module_dex::TradingPairStatus<Balance, BlockNumber>
   **/
  ModuleDexTradingPairStatus: {
    _enum: {
      Disabled: 'Null',
      Provisioning: 'ModuleDexProvisioningParameters',
      Enabled: 'Null'
    }
  },
  /**
   * Lookup503: module_dex::ProvisioningParameters<Balance, BlockNumber>
   **/
  ModuleDexProvisioningParameters: {
    minContribution: '(u128,u128)',
    targetProvision: '(u128,u128)',
    accumulatedProvision: '(u128,u128)',
    notBefore: 'u32'
  },
  /**
   * Lookup506: module_dex::module::Error<T>
   **/
  ModuleDexModuleError: {
    _enum: ['AlreadyEnabled', 'MustBeEnabled', 'MustBeProvisioning', 'MustBeDisabled', 'NotAllowedList', 'InvalidContributionIncrement', 'InvalidLiquidityIncrement', 'InvalidCurrencyId', 'InvalidTradingPathLength', 'InsufficientTargetAmount', 'ExcessiveSupplyAmount', 'InsufficientLiquidity', 'ZeroSupplyAmount', 'ZeroTargetAmount', 'UnacceptableShareIncrement', 'UnacceptableLiquidityWithdrawn', 'InvariantCheckFailed', 'UnqualifiedProvision', 'StillProvisioning', 'AssetUnregistered']
  },
  /**
   * Lookup507: module_auction_manager::CollateralAuctionItem<sp_core::crypto::AccountId32, BlockNumber>
   **/
  ModuleAuctionManagerCollateralAuctionItem: {
    refundRecipient: 'AccountId32',
    currencyId: 'AcalaPrimitivesCurrencyCurrencyId',
    initialAmount: 'Compact<u128>',
    amount: 'Compact<u128>',
    target: 'Compact<u128>',
    startTime: 'u32'
  },
  /**
   * Lookup508: module_auction_manager::module::Error<T>
   **/
  ModuleAuctionManagerModuleError: {
    _enum: ['AuctionNotExists', 'InReverseStage', 'InvalidFeedPrice', 'MustAfterShutdown', 'InvalidBidPrice', 'InvalidAmount']
  },
  /**
   * Lookup510: module_loans::Position
   **/
  ModuleLoansPosition: {
    collateral: 'u128',
    debit: 'u128'
  },
  /**
   * Lookup511: module_loans::module::Error<T>
   **/
  ModuleLoansModuleError: {
    _enum: ['AmountConvertFailed']
  },
  /**
   * Lookup513: module_honzon::module::Error<T>
   **/
  ModuleHonzonModuleError: {
    _enum: ['NoPermission', 'AlreadyShutdown', 'AuthorizationNotExists', 'AlreadyAuthorized']
  },
  /**
   * Lookup514: module_cdp_treasury::module::Error<T>
   **/
  ModuleCdpTreasuryModuleError: {
    _enum: ['CollateralNotEnough', 'SurplusPoolNotEnough', 'DebitPoolNotEnough', 'CannotSwap']
  },
  /**
   * Lookup515: module_cdp_engine::RiskManagementParams
   **/
  ModuleCdpEngineRiskManagementParams: {
    maximumTotalDebitValue: 'u128',
    interestRatePerSec: 'Option<u128>',
    liquidationRatio: 'Option<u128>',
    liquidationPenalty: 'Option<u128>',
    requiredCollateralRatio: 'Option<u128>'
  },
  /**
   * Lookup516: module_cdp_engine::module::Error<T>
   **/
  ModuleCdpEngineModuleError: {
    _enum: ['ExceedDebitValueHardCap', 'BelowRequiredCollateralRatio', 'BelowLiquidationRatio', 'MustBeUnsafe', 'MustBeSafe', 'InvalidCollateralType', 'RemainDebitValueTooSmall', 'InvalidFeedPrice', 'NoDebitValue', 'AlreadyShutdown', 'MustAfterShutdown']
  },
  /**
   * Lookup517: module_emergency_shutdown::module::Error<T>
   **/
  ModuleEmergencyShutdownModuleError: {
    _enum: ['AlreadyShutdown', 'MustAfterShutdown', 'CanNotRefund', 'ExistPotentialSurplus', 'ExistUnhandledDebit']
  },
  /**
   * Lookup518: module_homa::module::StakingLedger
   **/
  ModuleHomaModuleStakingLedger: {
    bonded: 'Compact<u128>',
    unlocking: 'Vec<ModuleHomaModuleUnlockChunk>'
  },
  /**
   * Lookup522: module_homa::module::Error<T>
   **/
  ModuleHomaModuleError: {
    _enum: ['BelowMintThreshold', 'BelowRedeemThreshold', 'ExceededStakingCurrencySoftCap', 'InsufficientUnclaimedRedemption', 'OutdatedEraIndex', 'FastMatchIsNotAllowed']
  },
  /**
   * Lookup524: module_homa_xcm::module::Error<T>
   **/
  ModuleHomaXcmModuleError: {
    _enum: ['XcmFailed']
  },
  /**
   * Lookup526: module_incentives::module::Error<T>
   **/
  ModuleIncentivesModuleError: {
    _enum: ['NotEnough', 'InvalidCurrencyId', 'InvalidPoolId', 'InvalidRate']
  },
  /**
   * Lookup527: module_nft::module::Error<T>
   **/
  ModuleNftModuleError: {
    _enum: ['ClassIdNotFound', 'TokenIdNotFound', 'NoPermission', 'InvalidQuantity', 'NonTransferable', 'NonBurnable', 'NonMintable', 'CannotDestroyClass', 'Immutable', 'AttributesTooLarge']
  },
  /**
   * Lookup528: module_asset_registry::module::Error<T>
   **/
  ModuleAssetRegistryModuleError: {
    _enum: ['BadLocation', 'MultiLocationExisted', 'AssetIdNotExists', 'AssetIdExisted']
  },
  /**
   * Lookup529: module_evm::module::AccountInfo<Index>
   **/
  ModuleEvmModuleAccountInfo: {
    nonce: 'u32',
    contractInfo: 'Option<ModuleEvmModuleContractInfo>'
  },
  /**
   * Lookup531: module_evm::module::ContractInfo
   **/
  ModuleEvmModuleContractInfo: {
    codeHash: 'H256',
    maintainer: 'H160',
    deployed: 'bool'
  },
  /**
   * Lookup534: module_evm::module::CodeInfo
   **/
  ModuleEvmModuleCodeInfo: {
    codeSize: 'u32',
    refCount: 'u32'
  },
  /**
   * Lookup535: module_evm::module::Error<T>
   **/
  ModuleEvmModuleError: {
    _enum: ['AddressNotMapped', 'ContractNotFound', 'NoPermission', 'ContractDevelopmentNotEnabled', 'ContractDevelopmentAlreadyEnabled', 'ContractAlreadyDeployed', 'ContractExceedsMaxCodeSize', 'ContractAlreadyExisted', 'OutOfStorage', 'ChargeFeeFailed', 'CannotKillContract', 'ReserveStorageFailed', 'UnreserveStorageFailed', 'ChargeStorageFailed', 'InvalidDecimals']
  },
  /**
   * Lookup536: module_evm_bridge::module::Error<T>
   **/
  ModuleEvmBridgeModuleError: {
    _enum: ['ExecutionFail', 'ExecutionRevert', 'ExecutionFatal', 'ExecutionError', 'InvalidReturnValue']
  },
  /**
   * Lookup537: module_evm_accounts::module::Error<T>
   **/
  ModuleEvmAccountsModuleError: {
    _enum: ['AccountIdHasMapped', 'EthAddressHasMapped', 'BadSignature', 'InvalidSignature', 'NonZeroRefCount']
  },
  /**
   * Lookup538: pallet_sudo::pallet::Error<T>
   **/
  PalletSudoError: {
    _enum: ['RequireSudo']
  },
  /**
   * Lookup540: acala_primitives::signature::AcalaMultiSignature
   **/
  AcalaPrimitivesSignatureAcalaMultiSignature: {
    _enum: {
      Ed25519: 'SpCoreEd25519Signature',
      Sr25519: 'SpCoreSr25519Signature',
      Ecdsa: 'SpCoreEcdsaSignature',
      Ethereum: '[u8;65]',
      Eip1559: '[u8;65]',
      AcalaEip712: '[u8;65]'
    }
  },
  /**
   * Lookup541: sp_core::ed25519::Signature
   **/
  SpCoreEd25519Signature: '[u8;64]',
  /**
   * Lookup543: sp_core::sr25519::Signature
   **/
  SpCoreSr25519Signature: '[u8;64]',
  /**
   * Lookup545: frame_system::extensions::check_spec_version::CheckSpecVersion<T>
   **/
  FrameSystemExtensionsCheckSpecVersion: 'Null',
  /**
   * Lookup546: frame_system::extensions::check_tx_version::CheckTxVersion<T>
   **/
  FrameSystemExtensionsCheckTxVersion: 'Null',
  /**
   * Lookup547: frame_system::extensions::check_genesis::CheckGenesis<T>
   **/
  FrameSystemExtensionsCheckGenesis: 'Null',
  /**
   * Lookup550: frame_system::extensions::check_nonce::CheckNonce<T>
   **/
  FrameSystemExtensionsCheckNonce: 'Compact<u32>',
  /**
   * Lookup551: frame_system::extensions::check_weight::CheckWeight<T>
   **/
  FrameSystemExtensionsCheckWeight: 'Null',
  /**
   * Lookup552: module_transaction_payment::ChargeTransactionPayment<T>
   **/
  ModuleTransactionPaymentChargeTransactionPayment: 'Compact<u128>',
  /**
   * Lookup553: module_evm::SetEvmOrigin<T>
   **/
  ModuleEvmSetEvmOrigin: 'Null'
};
