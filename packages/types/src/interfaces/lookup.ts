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
   * Lookup16: frame_system::EventRecord<mandala_runtime::Event, primitive_types::H256>
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
      ExtrinsicSuccess: {
        dispatchInfo: 'FrameSupportWeightsDispatchInfo',
      },
      ExtrinsicFailed: {
        dispatchError: 'SpRuntimeDispatchError',
        dispatchInfo: 'FrameSupportWeightsDispatchInfo',
      },
      CodeUpdated: 'Null',
      NewAccount: {
        account: 'AccountId32',
      },
      KilledAccount: {
        account: 'AccountId32',
      },
      Remarked: {
        _alias: {
          hash_: 'hash',
        },
        sender: 'AccountId32',
        hash_: 'H256'
      }
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
      Module: 'SpRuntimeModuleError',
      ConsumerRemaining: 'Null',
      NoProviders: 'Null',
      TooManyConsumers: 'Null',
      Token: 'SpRuntimeTokenError',
      Arithmetic: 'SpRuntimeArithmeticError',
      Transactional: 'SpRuntimeTransactionalError'
    }
  },
  /**
   * Lookup23: sp_runtime::ModuleError
   **/
  SpRuntimeModuleError: {
    index: 'u8',
    error: '[u8;4]'
  },
  /**
   * Lookup24: sp_runtime::TokenError
   **/
  SpRuntimeTokenError: {
    _enum: ['NoFunds', 'WouldDie', 'BelowMinimum', 'CannotCreate', 'UnknownAsset', 'Frozen', 'Unsupported']
  },
  /**
   * Lookup25: sp_runtime::ArithmeticError
   **/
  SpRuntimeArithmeticError: {
    _enum: ['Underflow', 'Overflow', 'DivisionByZero']
  },
  /**
   * Lookup26: sp_runtime::TransactionalError
   **/
  SpRuntimeTransactionalError: {
    _enum: ['LimitReached', 'NoLayer']
  },
  /**
   * Lookup27: pallet_scheduler::pallet::Event<T>
   **/
  PalletSchedulerEvent: {
    _enum: {
      Scheduled: {
        when: 'u32',
        index: 'u32',
      },
      Canceled: {
        when: 'u32',
        index: 'u32',
      },
      Dispatched: {
        task: '(u32,u32)',
        id: 'Option<Bytes>',
        result: 'Result<Null, SpRuntimeDispatchError>',
      },
      CallLookupFailed: {
        task: '(u32,u32)',
        id: 'Option<Bytes>',
        error: 'FrameSupportScheduleLookupError'
      }
    }
  },
  /**
   * Lookup32: frame_support::traits::schedule::LookupError
   **/
  FrameSupportScheduleLookupError: {
    _enum: ['Unknown', 'BadFormat']
  },
  /**
   * Lookup33: module_transaction_pause::module::Event<T>
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
   * Lookup34: pallet_preimage::pallet::Event<T>
   **/
  PalletPreimageEvent: {
    _enum: {
      Noted: {
        _alias: {
          hash_: 'hash',
        },
        hash_: 'H256',
      },
      Requested: {
        _alias: {
          hash_: 'hash',
        },
        hash_: 'H256',
      },
      Cleared: {
        _alias: {
          hash_: 'hash',
        },
        hash_: 'H256'
      }
    }
  },
  /**
   * Lookup35: pallet_balances::pallet::Event<T, I>
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
   * Lookup36: frame_support::traits::tokens::misc::BalanceStatus
   **/
  FrameSupportTokensMiscBalanceStatus: {
    _enum: ['Free', 'Reserved']
  },
  /**
   * Lookup37: orml_tokens::module::Event<T>
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
      ReserveRepatriated: {
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
        reserved: 'u128',
      },
      TotalIssuanceSet: {
        currencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        amount: 'u128',
      },
      Withdrawn: {
        currencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        who: 'AccountId32',
        amount: 'u128',
      },
      Slashed: {
        currencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        who: 'AccountId32',
        freeAmount: 'u128',
        reservedAmount: 'u128',
      },
      Deposited: {
        currencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        who: 'AccountId32',
        amount: 'u128',
      },
      LockSet: {
        lockId: '[u8;8]',
        currencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        who: 'AccountId32',
        amount: 'u128',
      },
      LockRemoved: {
        lockId: '[u8;8]',
        currencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        who: 'AccountId32'
      }
    }
  },
  /**
   * Lookup38: acala_primitives::currency::CurrencyId
   **/
  AcalaPrimitivesCurrencyCurrencyId: {
    _enum: {
      Token: 'AcalaPrimitivesCurrencyTokenSymbol',
      DexShare: '(AcalaPrimitivesCurrencyDexShare,AcalaPrimitivesCurrencyDexShare)',
      Erc20: 'H160',
      StableAssetPoolToken: 'u32',
      LiquidCrowdloan: 'u32',
      ForeignAsset: 'u16'
    }
  },
  /**
   * Lookup39: acala_primitives::currency::TokenSymbol
   **/
  AcalaPrimitivesCurrencyTokenSymbol: {
    _enum: ['ACA', 'AUSD', 'DOT', 'LDOT', 'TAP', '__Unused5', '__Unused6', '__Unused7', '__Unused8', '__Unused9', '__Unused10', '__Unused11', '__Unused12', '__Unused13', '__Unused14', '__Unused15', '__Unused16', '__Unused17', '__Unused18', '__Unused19', 'RENBTC', 'CASH', '__Unused22', '__Unused23', '__Unused24', '__Unused25', '__Unused26', '__Unused27', '__Unused28', '__Unused29', '__Unused30', '__Unused31', '__Unused32', '__Unused33', '__Unused34', '__Unused35', '__Unused36', '__Unused37', '__Unused38', '__Unused39', '__Unused40', '__Unused41', '__Unused42', '__Unused43', '__Unused44', '__Unused45', '__Unused46', '__Unused47', '__Unused48', '__Unused49', '__Unused50', '__Unused51', '__Unused52', '__Unused53', '__Unused54', '__Unused55', '__Unused56', '__Unused57', '__Unused58', '__Unused59', '__Unused60', '__Unused61', '__Unused62', '__Unused63', '__Unused64', '__Unused65', '__Unused66', '__Unused67', '__Unused68', '__Unused69', '__Unused70', '__Unused71', '__Unused72', '__Unused73', '__Unused74', '__Unused75', '__Unused76', '__Unused77', '__Unused78', '__Unused79', '__Unused80', '__Unused81', '__Unused82', '__Unused83', '__Unused84', '__Unused85', '__Unused86', '__Unused87', '__Unused88', '__Unused89', '__Unused90', '__Unused91', '__Unused92', '__Unused93', '__Unused94', '__Unused95', '__Unused96', '__Unused97', '__Unused98', '__Unused99', '__Unused100', '__Unused101', '__Unused102', '__Unused103', '__Unused104', '__Unused105', '__Unused106', '__Unused107', '__Unused108', '__Unused109', '__Unused110', '__Unused111', '__Unused112', '__Unused113', '__Unused114', '__Unused115', '__Unused116', '__Unused117', '__Unused118', '__Unused119', '__Unused120', '__Unused121', '__Unused122', '__Unused123', '__Unused124', '__Unused125', '__Unused126', '__Unused127', 'KAR', 'KUSD', 'KSM', 'LKSM', 'TAI', '__Unused133', '__Unused134', '__Unused135', '__Unused136', '__Unused137', '__Unused138', '__Unused139', '__Unused140', '__Unused141', '__Unused142', '__Unused143', '__Unused144', '__Unused145', '__Unused146', '__Unused147', '__Unused148', '__Unused149', '__Unused150', '__Unused151', '__Unused152', '__Unused153', '__Unused154', '__Unused155', '__Unused156', '__Unused157', '__Unused158', '__Unused159', '__Unused160', '__Unused161', '__Unused162', '__Unused163', '__Unused164', '__Unused165', '__Unused166', '__Unused167', 'BNC', 'VSKSM', 'PHA', 'KINT', 'KBTC']
  },
  /**
   * Lookup40: acala_primitives::currency::DexShare
   **/
  AcalaPrimitivesCurrencyDexShare: {
    _enum: {
      Token: 'AcalaPrimitivesCurrencyTokenSymbol',
      Erc20: 'H160',
      LiquidCrowdloan: 'u32',
      ForeignAsset: 'u16',
      StableAssetPoolToken: 'u32'
    }
  },
  /**
   * Lookup45: module_currencies::module::Event<T>
   **/
  ModuleCurrenciesModuleEvent: {
    _enum: {
      Transferred: {
        currencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        from: 'AccountId32',
        to: 'AccountId32',
        amount: 'u128',
      },
      Withdrawn: {
        currencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        who: 'AccountId32',
        amount: 'u128',
      },
      Deposited: {
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
   * Lookup46: orml_vesting::module::Event<T>
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
   * Lookup47: orml_vesting::VestingSchedule<BlockNumber, Balance>
   **/
  OrmlVestingVestingSchedule: {
    start: 'u32',
    period: 'u32',
    periodCount: 'u32',
    perPeriod: 'Compact<u128>'
  },
  /**
   * Lookup49: module_transaction_payment::module::Event<T>
   **/
  ModuleTransactionPaymentModuleEvent: {
    _enum: {
      ChargeFeePoolEnabled: {
        subAccount: 'AccountId32',
        currencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        exchangeRate: 'u128',
        poolSize: 'u128',
        swapThreshold: 'u128',
      },
      ChargeFeePoolSwapped: {
        subAccount: 'AccountId32',
        supplyCurrencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        oldExchangeRate: 'u128',
        swapExchangeRate: 'u128',
        newExchangeRate: 'u128',
        newPoolSize: 'u128',
      },
      ChargeFeePoolDisabled: {
        currencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        foreignAmount: 'u128',
        nativeAmount: 'u128',
      },
      TransactionFeePaid: {
        who: 'AccountId32',
        actualFee: 'u128',
        actualTip: 'u128',
        actualSurplus: 'u128'
      }
    }
  },
  /**
   * Lookup51: pallet_treasury::pallet::Event<T, I>
   **/
  PalletTreasuryEvent: {
    _enum: {
      Proposed: {
        proposalIndex: 'u32',
      },
      Spending: {
        budgetRemaining: 'u128',
      },
      Awarded: {
        proposalIndex: 'u32',
        award: 'u128',
        account: 'AccountId32',
      },
      Rejected: {
        proposalIndex: 'u32',
        slashed: 'u128',
      },
      Burnt: {
        burntFunds: 'u128',
      },
      Rollover: {
        rolloverBalance: 'u128',
      },
      Deposit: {
        value: 'u128',
      },
      SpendApproved: {
        proposalIndex: 'u32',
        amount: 'u128',
        beneficiary: 'AccountId32'
      }
    }
  },
  /**
   * Lookup52: pallet_bounties::pallet::Event<T, I>
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
   * Lookup53: pallet_tips::pallet::Event<T, I>
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
   * Lookup54: pallet_utility::pallet::Event
   **/
  PalletUtilityEvent: {
    _enum: {
      BatchInterrupted: {
        index: 'u32',
        error: 'SpRuntimeDispatchError',
      },
      BatchCompleted: 'Null',
      BatchCompletedWithErrors: 'Null',
      ItemCompleted: 'Null',
      ItemFailed: {
        error: 'SpRuntimeDispatchError',
      },
      DispatchedAs: {
        result: 'Result<Null, SpRuntimeDispatchError>'
      }
    }
  },
  /**
   * Lookup55: pallet_multisig::pallet::Event<T>
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
   * Lookup56: pallet_multisig::Timepoint<BlockNumber>
   **/
  PalletMultisigTimepoint: {
    height: 'u32',
    index: 'u32'
  },
  /**
   * Lookup57: pallet_recovery::pallet::Event<T>
   **/
  PalletRecoveryEvent: {
    _enum: {
      RecoveryCreated: {
        account: 'AccountId32',
      },
      RecoveryInitiated: {
        lostAccount: 'AccountId32',
        rescuerAccount: 'AccountId32',
      },
      RecoveryVouched: {
        lostAccount: 'AccountId32',
        rescuerAccount: 'AccountId32',
        sender: 'AccountId32',
      },
      RecoveryClosed: {
        lostAccount: 'AccountId32',
        rescuerAccount: 'AccountId32',
      },
      AccountRecovered: {
        lostAccount: 'AccountId32',
        rescuerAccount: 'AccountId32',
      },
      RecoveryRemoved: {
        lostAccount: 'AccountId32'
      }
    }
  },
  /**
   * Lookup58: pallet_proxy::pallet::Event<T>
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
        delay: 'u32',
      },
      ProxyRemoved: {
        delegator: 'AccountId32',
        delegatee: 'AccountId32',
        proxyType: 'RuntimeCommonProxyType',
        delay: 'u32'
      }
    }
  },
  /**
   * Lookup59: runtime_common::ProxyType
   **/
  RuntimeCommonProxyType: {
    _enum: ['Any', 'CancelProxy', 'Governance', 'Auction', 'Swap', 'Loan', 'DexLiquidity', 'StableAssetSwap', 'StableAssetLiquidity', 'Homa']
  },
  /**
   * Lookup60: module_idle_scheduler::module::Event<T>
   **/
  ModuleIdleSchedulerModuleEvent: {
    _enum: {
      TaskDispatched: {
        taskId: 'u32',
        result: 'Result<Null, SpRuntimeDispatchError>',
      },
      TaskAdded: {
        taskId: 'u32',
        task: 'MandalaRuntimeScheduledTasks'
      }
    }
  },
  /**
   * Lookup61: mandala_runtime::ScheduledTasks
   **/
  MandalaRuntimeScheduledTasks: {
    _enum: {
      EvmTask: 'ModuleEvmEvmTask'
    }
  },
  /**
   * Lookup62: module_evm::EvmTask<mandala_runtime::Runtime>
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
   * Lookup63: mandala_runtime::Runtime
   **/
  MandalaRuntimeRuntime: 'Null',
  /**
   * Lookup64: pallet_indices::pallet::Event<T>
   **/
  PalletIndicesEvent: {
    _enum: {
      IndexAssigned: {
        who: 'AccountId32',
        index: 'u32',
      },
      IndexFreed: {
        index: 'u32',
      },
      IndexFrozen: {
        index: 'u32',
        who: 'AccountId32'
      }
    }
  },
  /**
   * Lookup65: pallet_collective::pallet::Event<T, I>
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
   * Lookup67: pallet_membership::pallet::Event<T, I>
   **/
  PalletMembershipEvent: {
    _enum: ['MemberAdded', 'MemberRemoved', 'MembersSwapped', 'MembersReset', 'KeyChanged', 'Dummy']
  },
  /**
   * Lookup74: orml_authority::module::Event<T>
   **/
  OrmlAuthorityModuleEvent: {
    _enum: {
      Dispatched: {
        result: 'Result<Null, SpRuntimeDispatchError>',
      },
      Scheduled: {
        origin: 'MandalaRuntimeOriginCaller',
        index: 'u32',
      },
      FastTracked: {
        origin: 'MandalaRuntimeOriginCaller',
        index: 'u32',
        when: 'u32',
      },
      Delayed: {
        origin: 'MandalaRuntimeOriginCaller',
        index: 'u32',
        when: 'u32',
      },
      Cancelled: {
        origin: 'MandalaRuntimeOriginCaller',
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
   * Lookup75: mandala_runtime::OriginCaller
   **/
  MandalaRuntimeOriginCaller: {
    _enum: {
      system: 'FrameSupportDispatchRawOrigin',
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
      GeneralCouncil: 'PalletCollectiveRawOrigin',
      __Unused51: 'Null',
      FinancialCouncil: 'PalletCollectiveRawOrigin',
      __Unused53: 'Null',
      HomaCouncil: 'PalletCollectiveRawOrigin',
      __Unused55: 'Null',
      TechnicalCommittee: 'PalletCollectiveRawOrigin',
      __Unused57: 'Null',
      __Unused58: 'Null',
      __Unused59: 'Null',
      __Unused60: 'Null',
      __Unused61: 'Null',
      __Unused62: 'Null',
      __Unused63: 'Null',
      __Unused64: 'Null',
      __Unused65: 'Null',
      __Unused66: 'Null',
      __Unused67: 'Null',
      __Unused68: 'Null',
      __Unused69: 'Null',
      Authority: 'OrmlAuthorityDelayedOrigin',
      __Unused71: 'Null',
      __Unused72: 'Null',
      __Unused73: 'Null',
      __Unused74: 'Null',
      __Unused75: 'Null',
      __Unused76: 'Null',
      __Unused77: 'Null',
      __Unused78: 'Null',
      __Unused79: 'Null',
      __Unused80: 'Null',
      __Unused81: 'Null',
      __Unused82: 'Null',
      __Unused83: 'Null',
      __Unused84: 'Null',
      __Unused85: 'Null',
      __Unused86: 'Null',
      __Unused87: 'Null',
      __Unused88: 'Null',
      __Unused89: 'Null',
      __Unused90: 'Null',
      __Unused91: 'Null',
      __Unused92: 'Null',
      __Unused93: 'Null',
      __Unused94: 'Null',
      __Unused95: 'Null',
      __Unused96: 'Null',
      __Unused97: 'Null',
      __Unused98: 'Null',
      __Unused99: 'Null',
      __Unused100: 'Null',
      __Unused101: 'Null',
      __Unused102: 'Null',
      __Unused103: 'Null',
      __Unused104: 'Null',
      __Unused105: 'Null',
      __Unused106: 'Null',
      __Unused107: 'Null',
      __Unused108: 'Null',
      __Unused109: 'Null',
      __Unused110: 'Null',
      __Unused111: 'Null',
      __Unused112: 'Null',
      __Unused113: 'Null',
      __Unused114: 'Null',
      __Unused115: 'Null',
      __Unused116: 'Null',
      __Unused117: 'Null',
      __Unused118: 'Null',
      __Unused119: 'Null',
      __Unused120: 'Null',
      __Unused121: 'Null',
      __Unused122: 'Null',
      __Unused123: 'Null',
      __Unused124: 'Null',
      __Unused125: 'Null',
      __Unused126: 'Null',
      __Unused127: 'Null',
      __Unused128: 'Null',
      __Unused129: 'Null',
      __Unused130: 'Null',
      __Unused131: 'Null',
      __Unused132: 'Null',
      __Unused133: 'Null',
      __Unused134: 'Null',
      __Unused135: 'Null',
      __Unused136: 'Null',
      __Unused137: 'Null',
      __Unused138: 'Null',
      __Unused139: 'Null',
      __Unused140: 'Null',
      __Unused141: 'Null',
      __Unused142: 'Null',
      __Unused143: 'Null',
      __Unused144: 'Null',
      __Unused145: 'Null',
      __Unused146: 'Null',
      __Unused147: 'Null',
      __Unused148: 'Null',
      __Unused149: 'Null',
      __Unused150: 'Null',
      __Unused151: 'Null',
      __Unused152: 'Null',
      __Unused153: 'Null',
      __Unused154: 'Null',
      __Unused155: 'Null',
      __Unused156: 'Null',
      __Unused157: 'Null',
      __Unused158: 'Null',
      __Unused159: 'Null',
      __Unused160: 'Null',
      __Unused161: 'Null',
      __Unused162: 'Null',
      __Unused163: 'Null',
      __Unused164: 'Null',
      __Unused165: 'Null',
      __Unused166: 'Null',
      __Unused167: 'Null',
      __Unused168: 'Null',
      __Unused169: 'Null',
      __Unused170: 'Null',
      PolkadotXcm: 'PalletXcmOrigin',
      CumulusXcm: 'CumulusPalletXcmOrigin'
    }
  },
  /**
   * Lookup76: frame_support::dispatch::RawOrigin<sp_core::crypto::AccountId32>
   **/
  FrameSupportDispatchRawOrigin: {
    _enum: {
      Root: 'Null',
      Signed: 'AccountId32',
      None: 'Null'
    }
  },
  /**
   * Lookup77: pallet_collective::RawOrigin<sp_core::crypto::AccountId32, I>
   **/
  PalletCollectiveRawOrigin: {
    _enum: {
      Members: '(u32,u32)',
      Member: 'AccountId32',
      _Phantom: 'Null'
    }
  },
  /**
   * Lookup81: orml_authority::DelayedOrigin<BlockNumber, mandala_runtime::OriginCaller>
   **/
  OrmlAuthorityDelayedOrigin: {
    delay: 'u32',
    origin: 'MandalaRuntimeOriginCaller'
  },
  /**
   * Lookup82: pallet_xcm::pallet::Origin
   **/
  PalletXcmOrigin: {
    _enum: {
      Xcm: 'XcmV1MultiLocation',
      Response: 'XcmV1MultiLocation'
    }
  },
  /**
   * Lookup83: xcm::v1::multilocation::MultiLocation
   **/
  XcmV1MultiLocation: {
    parents: 'u8',
    interior: 'XcmV1MultilocationJunctions'
  },
  /**
   * Lookup84: xcm::v1::multilocation::Junctions
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
   * Lookup85: xcm::v1::junction::Junction
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
   * Lookup87: xcm::v0::junction::NetworkId
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
   * Lookup90: xcm::v0::junction::BodyId
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
   * Lookup91: xcm::v0::junction::BodyPart
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
   * Lookup92: cumulus_pallet_xcm::pallet::Origin
   **/
  CumulusPalletXcmOrigin: {
    _enum: {
      Relay: 'Null',
      SiblingParachain: 'u32'
    }
  },
  /**
   * Lookup94: sp_core::Void
   **/
  SpCoreVoid: 'Null',
  /**
   * Lookup96: pallet_elections_phragmen::pallet::Event<T>
   **/
  PalletElectionsPhragmenEvent: {
    _enum: {
      NewTerm: {
        newMembers: 'Vec<(AccountId32,u128)>',
      },
      EmptyTerm: 'Null',
      ElectionError: 'Null',
      MemberKicked: {
        member: 'AccountId32',
      },
      Renounced: {
        candidate: 'AccountId32',
      },
      CandidateSlashed: {
        candidate: 'AccountId32',
        amount: 'u128',
      },
      SeatHolderSlashed: {
        seatHolder: 'AccountId32',
        amount: 'u128'
      }
    }
  },
  /**
   * Lookup99: pallet_democracy::pallet::Event<T>
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
        proposalHash: 'H256',
      },
      Voted: {
        voter: 'AccountId32',
        refIndex: 'u32',
        vote: 'PalletDemocracyVoteAccountVote',
      },
      Seconded: {
        seconder: 'AccountId32',
        propIndex: 'u32',
      },
      ProposalCanceled: {
        propIndex: 'u32'
      }
    }
  },
  /**
   * Lookup101: pallet_democracy::vote_threshold::VoteThreshold
   **/
  PalletDemocracyVoteThreshold: {
    _enum: ['SuperMajorityApprove', 'SuperMajorityAgainst', 'SimpleMajority']
  },
  /**
   * Lookup102: pallet_democracy::vote::AccountVote<Balance>
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
   * Lookup104: orml_oracle::module::Event<T, I>
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
   * Lookup108: orml_auction::module::Event<T>
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
   * Lookup109: module_prices::module::Event<T>
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
   * Lookup110: module_dex::module::Event<T>
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
        shareAmount: 'u128',
      },
      RefundProvision: {
        who: 'AccountId32',
        currency0: 'AcalaPrimitivesCurrencyCurrencyId',
        contribution0: 'u128',
        currency1: 'AcalaPrimitivesCurrencyCurrencyId',
        contribution1: 'u128',
      },
      ProvisioningAborted: {
        tradingPair: 'AcalaPrimitivesTradingPair',
        accumulatedProvision0: 'u128',
        accumulatedProvision1: 'u128'
      }
    }
  },
  /**
   * Lookup113: acala_primitives::TradingPair
   **/
  AcalaPrimitivesTradingPair: '(AcalaPrimitivesCurrencyCurrencyId,AcalaPrimitivesCurrencyCurrencyId)',
  /**
   * Lookup114: module_auction_manager::module::Event<T>
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
        supplyCollateralAmount: 'u128',
        targetStableAmount: 'u128',
      },
      CollateralAuctionAborted: {
        auctionId: 'u32',
        collateralType: 'AcalaPrimitivesCurrencyCurrencyId',
        collateralAmount: 'u128',
        targetStableAmount: 'u128',
        refundRecipient: 'AccountId32'
      }
    }
  },
  /**
   * Lookup115: module_loans::module::Event<T>
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
   * Lookup117: module_honzon::module::Event<T>
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
        authorizer: 'AccountId32',
      },
      TransferDebit: {
        fromCurrency: 'AcalaPrimitivesCurrencyCurrencyId',
        toCurrency: 'AcalaPrimitivesCurrencyCurrencyId',
        amount: 'u128'
      }
    }
  },
  /**
   * Lookup118: module_cdp_treasury::module::Event<T>
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
   * Lookup119: module_cdp_engine::module::Event<T>
   **/
  ModuleCdpEngineModuleEvent: {
    _enum: {
      LiquidateUnsafeCDP: {
        collateralType: 'AcalaPrimitivesCurrencyCurrencyId',
        owner: 'AccountId32',
        collateralAmount: 'u128',
        badDebtValue: 'u128',
        targetAmount: 'u128',
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
      LiquidationContractRegistered: {
        address: 'H160',
      },
      LiquidationContractDeregistered: {
        address: 'H160'
      }
    }
  },
  /**
   * Lookup121: module_emergency_shutdown::module::Event<T>
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
   * Lookup124: module_nominees_election::module::Event<T, I>
   **/
  ModuleNomineesElectionModuleEvent: {
    _enum: {
      Rebond: {
        who: 'AccountId32',
        amount: 'u128'
      }
    }
  },
  /**
   * Lookup125: module_homa::module::Event<T>
   **/
  ModuleHomaModuleEvent: {
    _enum: {
      Minted: {
        minter: 'AccountId32',
        stakingCurrencyAmount: 'u128',
        liquidAmountReceived: 'u128',
        liquidAmountAddedToVoid: 'u128',
      },
      RequestedRedeem: {
        redeemer: 'AccountId32',
        liquidAmount: 'u128',
        allowFastMatch: 'bool',
      },
      RedeemRequestCancelled: {
        redeemer: 'AccountId32',
        cancelledLiquidAmount: 'u128',
      },
      RedeemedByFastMatch: {
        redeemer: 'AccountId32',
        matchedLiquidAmount: 'u128',
        feeInLiquid: 'u128',
        redeemedStakingAmount: 'u128',
      },
      RedeemedByUnbond: {
        redeemer: 'AccountId32',
        eraIndexWhenUnbond: 'u32',
        liquidAmount: 'u128',
        unbondingStakingAmount: 'u128',
      },
      WithdrawRedemption: {
        redeemer: 'AccountId32',
        redemptionAmount: 'u128',
      },
      CurrentEraBumped: {
        newEraIndex: 'u32',
      },
      CurrentEraReset: {
        newEraIndex: 'u32',
      },
      LedgerBondedReset: {
        subAccountIndex: 'u16',
        newBondedAmount: 'u128',
      },
      LedgerUnlockingReset: {
        subAccountIndex: 'u16',
        newUnlocking: 'Vec<ModuleHomaModuleUnlockChunk>',
      },
      SoftBondedCapPerSubAccountUpdated: {
        capAmount: 'u128',
      },
      EstimatedRewardRatePerEraUpdated: {
        rewardRate: 'u128',
      },
      CommissionRateUpdated: {
        commissionRate: 'u128',
      },
      FastMatchFeeRateUpdated: {
        fastMatchFeeRate: 'u128',
      },
      LastEraBumpedBlockUpdated: {
        lastEraBumpedBlock: 'u32',
      },
      BumpEraFrequencyUpdated: {
        frequency: 'u32'
      }
    }
  },
  /**
   * Lookup127: module_homa::module::UnlockChunk
   **/
  ModuleHomaModuleUnlockChunk: {
    value: 'Compact<u128>',
    era: 'Compact<u32>'
  },
  /**
   * Lookup128: module_xcm_interface::module::Event<T>
   **/
  ModuleXcmInterfaceModuleEvent: {
    _enum: {
      XcmDestWeightUpdated: {
        xcmOperation: 'ModuleXcmInterfaceModuleXcmInterfaceOperation',
        newXcmDestWeight: 'u64',
      },
      XcmFeeUpdated: {
        xcmOperation: 'ModuleXcmInterfaceModuleXcmInterfaceOperation',
        newXcmDestWeight: 'u128'
      }
    }
  },
  /**
   * Lookup129: module_xcm_interface::module::XcmInterfaceOperation
   **/
  ModuleXcmInterfaceModuleXcmInterfaceOperation: {
    _enum: {
      XtokensTransfer: 'Null',
      HomaWithdrawUnbonded: 'Null',
      HomaBondExtra: 'Null',
      HomaUnbond: 'Null',
      ParachainFee: 'XcmV1MultiLocation'
    }
  },
  /**
   * Lookup130: module_incentives::module::Event<T>
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
        pool: 'ModuleSupportIncentivesPoolId',
        rewardCurrencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        actualAmount: 'u128',
        deductionAmount: 'u128',
      },
      IncentiveRewardAmountUpdated: {
        pool: 'ModuleSupportIncentivesPoolId',
        rewardCurrencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        rewardAmountPerPeriod: 'u128',
      },
      ClaimRewardDeductionRateUpdated: {
        pool: 'ModuleSupportIncentivesPoolId',
        deductionRate: 'u128'
      }
    }
  },
  /**
   * Lookup131: module_support::incentives::PoolId
   **/
  ModuleSupportIncentivesPoolId: {
    _enum: {
      Loans: 'AcalaPrimitivesCurrencyCurrencyId',
      Dex: 'AcalaPrimitivesCurrencyCurrencyId'
    }
  },
  /**
   * Lookup132: module_nft::module::Event<T>
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
   * Lookup133: module_asset_registry::module::Event<T>
   **/
  ModuleAssetRegistryModuleEvent: {
    _enum: {
      ForeignAssetRegistered: {
        assetId: 'u16',
        assetAddress: 'XcmV1MultiLocation',
        metadata: 'AcalaPrimitivesCurrencyAssetMetadata',
      },
      ForeignAssetUpdated: {
        assetId: 'u16',
        assetAddress: 'XcmV1MultiLocation',
        metadata: 'AcalaPrimitivesCurrencyAssetMetadata',
      },
      AssetRegistered: {
        assetId: 'AcalaPrimitivesCurrencyAssetIds',
        metadata: 'AcalaPrimitivesCurrencyAssetMetadata',
      },
      AssetUpdated: {
        assetId: 'AcalaPrimitivesCurrencyAssetIds',
        metadata: 'AcalaPrimitivesCurrencyAssetMetadata'
      }
    }
  },
  /**
   * Lookup134: acala_primitives::currency::AssetMetadata<Balance>
   **/
  AcalaPrimitivesCurrencyAssetMetadata: {
    name: 'Bytes',
    symbol: 'Bytes',
    decimals: 'u8',
    minimalBalance: 'u128'
  },
  /**
   * Lookup135: acala_primitives::currency::AssetIds
   **/
  AcalaPrimitivesCurrencyAssetIds: {
    _enum: {
      Erc20: 'H160',
      StableAssetId: 'u32',
      ForeignAssetId: 'u16',
      NativeAssetId: 'AcalaPrimitivesCurrencyCurrencyId'
    }
  },
  /**
   * Lookup136: ecosystem_renvm_bridge::module::Event<T>
   **/
  EcosystemRenvmBridgeModuleEvent: {
    _enum: {
      Minted: {
        owner: 'AccountId32',
        amount: 'u128',
      },
      Burnt: {
        owner: 'AccountId32',
        dest: 'Bytes',
        amount: 'u128',
      },
      RotatedKey: {
        key: '[u8;20]'
      }
    }
  },
  /**
   * Lookup137: ecosystem_starport::module::Event<T>
   **/
  EcosystemStarportModuleEvent: {
    _enum: {
      AssetLockedTo: {
        currencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        amount: 'u128',
        user: 'AccountId32',
      },
      AssetUnlocked: {
        currencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        amount: 'u128',
        user: 'AccountId32',
      },
      GatewayAuthoritiesChanged: 'Null',
      SupplyCapSet: {
        currencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        newCap: 'u128',
      },
      FutureYieldSet: {
        yieldAmount: 'u128',
        index: 'u128',
        timestamp: 'u64'
      }
    }
  },
  /**
   * Lookup138: ecosystem_compound_cash::module::Event<T>
   **/
  EcosystemCompoundCashModuleEvent: {
    _enum: {
      FutureYieldSet: {
        yieldAmount: 'u128',
        index: 'u128',
        timestamp: 'u64'
      }
    }
  },
  /**
   * Lookup139: cumulus_pallet_xcmp_queue::pallet::Event<T>
   **/
  CumulusPalletXcmpQueueEvent: {
    _enum: {
      Success: {
        messageHash: 'Option<H256>',
        weight: 'u64',
      },
      Fail: {
        messageHash: 'Option<H256>',
        error: 'XcmV2TraitsError',
        weight: 'u64',
      },
      BadVersion: {
        messageHash: 'Option<H256>',
      },
      BadFormat: {
        messageHash: 'Option<H256>',
      },
      UpwardMessageSent: {
        messageHash: 'Option<H256>',
      },
      XcmpMessageSent: {
        messageHash: 'Option<H256>',
      },
      OverweightEnqueued: {
        sender: 'u32',
        sentAt: 'u32',
        index: 'u64',
        required: 'u64',
      },
      OverweightServiced: {
        index: 'u64',
        used: 'u64'
      }
    }
  },
  /**
   * Lookup141: xcm::v2::traits::Error
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
      MaxWeightInvalid: 'Null',
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
   * Lookup142: pallet_xcm::pallet::Event<T>
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
   * Lookup143: xcm::v2::traits::Outcome
   **/
  XcmV2TraitsOutcome: {
    _enum: {
      Complete: 'u64',
      Incomplete: '(u64,XcmV2TraitsError)',
      Error: 'XcmV2TraitsError'
    }
  },
  /**
   * Lookup144: xcm::v2::Xcm<Call>
   **/
  XcmV2Xcm: 'Vec<XcmV2Instruction>',
  /**
   * Lookup146: xcm::v2::Instruction<Call>
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
   * Lookup147: xcm::v1::multiasset::MultiAssets
   **/
  XcmV1MultiassetMultiAssets: 'Vec<XcmV1MultiAsset>',
  /**
   * Lookup149: xcm::v1::multiasset::MultiAsset
   **/
  XcmV1MultiAsset: {
    id: 'XcmV1MultiassetAssetId',
    fun: 'XcmV1MultiassetFungibility'
  },
  /**
   * Lookup150: xcm::v1::multiasset::AssetId
   **/
  XcmV1MultiassetAssetId: {
    _enum: {
      Concrete: 'XcmV1MultiLocation',
      Abstract: 'Bytes'
    }
  },
  /**
   * Lookup151: xcm::v1::multiasset::Fungibility
   **/
  XcmV1MultiassetFungibility: {
    _enum: {
      Fungible: 'Compact<u128>',
      NonFungible: 'XcmV1MultiassetAssetInstance'
    }
  },
  /**
   * Lookup152: xcm::v1::multiasset::AssetInstance
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
   * Lookup154: xcm::v2::Response
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
   * Lookup157: xcm::v0::OriginKind
   **/
  XcmV0OriginKind: {
    _enum: ['Native', 'SovereignAccount', 'Superuser', 'Xcm']
  },
  /**
   * Lookup158: xcm::double_encoded::DoubleEncoded<T>
   **/
  XcmDoubleEncoded: {
    encoded: 'Bytes'
  },
  /**
   * Lookup159: xcm::v1::multiasset::MultiAssetFilter
   **/
  XcmV1MultiassetMultiAssetFilter: {
    _enum: {
      Definite: 'XcmV1MultiassetMultiAssets',
      Wild: 'XcmV1MultiassetWildMultiAsset'
    }
  },
  /**
   * Lookup160: xcm::v1::multiasset::WildMultiAsset
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
   * Lookup161: xcm::v1::multiasset::WildFungibility
   **/
  XcmV1MultiassetWildFungibility: {
    _enum: ['Fungible', 'NonFungible']
  },
  /**
   * Lookup162: xcm::v2::WeightLimit
   **/
  XcmV2WeightLimit: {
    _enum: {
      Unlimited: 'Null',
      Limited: 'Compact<u64>'
    }
  },
  /**
   * Lookup164: xcm::VersionedMultiAssets
   **/
  XcmVersionedMultiAssets: {
    _enum: {
      V0: 'Vec<XcmV0MultiAsset>',
      V1: 'XcmV1MultiassetMultiAssets'
    }
  },
  /**
   * Lookup166: xcm::v0::multi_asset::MultiAsset
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
   * Lookup167: xcm::v0::multi_location::MultiLocation
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
   * Lookup168: xcm::v0::junction::Junction
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
   * Lookup169: xcm::VersionedMultiLocation
   **/
  XcmVersionedMultiLocation: {
    _enum: {
      V0: 'XcmV0MultiLocation',
      V1: 'XcmV1MultiLocation'
    }
  },
  /**
   * Lookup170: cumulus_pallet_xcm::pallet::Event<T>
   **/
  CumulusPalletXcmEvent: {
    _enum: {
      InvalidFormat: '[u8;8]',
      UnsupportedVersion: '[u8;8]',
      ExecutedDownward: '([u8;8],XcmV2TraitsOutcome)'
    }
  },
  /**
   * Lookup171: cumulus_pallet_dmp_queue::pallet::Event<T>
   **/
  CumulusPalletDmpQueueEvent: {
    _enum: {
      InvalidFormat: {
        messageId: '[u8;32]',
      },
      UnsupportedVersion: {
        messageId: '[u8;32]',
      },
      ExecutedDownward: {
        messageId: '[u8;32]',
        outcome: 'XcmV2TraitsOutcome',
      },
      WeightExhausted: {
        messageId: '[u8;32]',
        remainingWeight: 'u64',
        requiredWeight: 'u64',
      },
      OverweightEnqueued: {
        messageId: '[u8;32]',
        overweightIndex: 'u64',
        requiredWeight: 'u64',
      },
      OverweightServiced: {
        overweightIndex: 'u64',
        weightUsed: 'u64'
      }
    }
  },
  /**
   * Lookup172: orml_xtokens::module::Event<T>
   **/
  OrmlXtokensModuleEvent: {
    _enum: {
      TransferredMultiAssets: {
        sender: 'AccountId32',
        assets: 'XcmV1MultiassetMultiAssets',
        fee: 'XcmV1MultiAsset',
        dest: 'XcmV1MultiLocation'
      }
    }
  },
  /**
   * Lookup173: orml_unknown_tokens::module::Event
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
   * Lookup174: orml_xcm::module::Event<T>
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
   * Lookup175: module_evm::module::Event<T>
   **/
  ModuleEvmModuleEvent: {
    _enum: {
      Created: {
        from: 'H160',
        contract: 'H160',
        logs: 'Vec<EthereumLog>',
        usedGas: 'u64',
        usedStorage: 'i32',
      },
      CreatedFailed: {
        from: 'H160',
        contract: 'H160',
        exitReason: 'EvmCoreErrorExitReason',
        logs: 'Vec<EthereumLog>',
        usedGas: 'u64',
        usedStorage: 'i32',
      },
      Executed: {
        from: 'H160',
        contract: 'H160',
        logs: 'Vec<EthereumLog>',
        usedGas: 'u64',
        usedStorage: 'i32',
      },
      ExecutedFailed: {
        from: 'H160',
        contract: 'H160',
        exitReason: 'EvmCoreErrorExitReason',
        output: 'Bytes',
        logs: 'Vec<EthereumLog>',
        usedGas: 'u64',
        usedStorage: 'i32',
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
      ContractPublished: {
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
   * Lookup177: ethereum::log::Log
   **/
  EthereumLog: {
    address: 'H160',
    topics: 'Vec<H256>',
    data: 'Bytes'
  },
  /**
   * Lookup180: evm_core::error::ExitReason
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
   * Lookup181: evm_core::error::ExitSucceed
   **/
  EvmCoreErrorExitSucceed: {
    _enum: ['Stopped', 'Returned', 'Suicided']
  },
  /**
   * Lookup182: evm_core::error::ExitError
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
      Other: 'Text',
      InvalidCode: 'Null'
    }
  },
  /**
   * Lookup185: evm_core::error::ExitRevert
   **/
  EvmCoreErrorExitRevert: {
    _enum: ['Reverted']
  },
  /**
   * Lookup186: evm_core::error::ExitFatal
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
   * Lookup187: module_evm_accounts::module::Event<T>
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
   * Lookup188: module_collator_selection::pallet::Event<T>
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
   * Lookup189: pallet_session::pallet::Event
   **/
  PalletSessionEvent: {
    _enum: {
      NewSession: {
        sessionIndex: 'u32'
      }
    }
  },
  /**
   * Lookup190: module_session_manager::module::Event<T>
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
   * Lookup191: nutsfinance_stable_asset::pallet::Event<T>
   **/
  NutsfinanceStableAssetEvent: {
    _enum: {
      CreatePool: {
        poolId: 'u32',
        a: 'u128',
        swapId: 'AccountId32',
        palletId: 'AccountId32',
      },
      Minted: {
        minter: 'AccountId32',
        poolId: 'u32',
        a: 'u128',
        inputAmounts: 'Vec<u128>',
        minOutputAmount: 'u128',
        balances: 'Vec<u128>',
        totalSupply: 'u128',
        feeAmount: 'u128',
        outputAmount: 'u128',
      },
      TokenSwapped: {
        swapper: 'AccountId32',
        poolId: 'u32',
        a: 'u128',
        inputAsset: 'AcalaPrimitivesCurrencyCurrencyId',
        outputAsset: 'AcalaPrimitivesCurrencyCurrencyId',
        inputAmount: 'u128',
        minOutputAmount: 'u128',
        balances: 'Vec<u128>',
        totalSupply: 'u128',
        outputAmount: 'u128',
      },
      RedeemedProportion: {
        redeemer: 'AccountId32',
        poolId: 'u32',
        a: 'u128',
        inputAmount: 'u128',
        minOutputAmounts: 'Vec<u128>',
        balances: 'Vec<u128>',
        totalSupply: 'u128',
        feeAmount: 'u128',
        outputAmounts: 'Vec<u128>',
      },
      RedeemedSingle: {
        redeemer: 'AccountId32',
        poolId: 'u32',
        a: 'u128',
        inputAmount: 'u128',
        outputAsset: 'AcalaPrimitivesCurrencyCurrencyId',
        minOutputAmount: 'u128',
        balances: 'Vec<u128>',
        totalSupply: 'u128',
        feeAmount: 'u128',
        outputAmount: 'u128',
      },
      RedeemedMulti: {
        redeemer: 'AccountId32',
        poolId: 'u32',
        a: 'u128',
        outputAmounts: 'Vec<u128>',
        maxInputAmount: 'u128',
        balances: 'Vec<u128>',
        totalSupply: 'u128',
        feeAmount: 'u128',
        inputAmount: 'u128',
      },
      BalanceUpdated: {
        poolId: 'u32',
        oldBalances: 'Vec<u128>',
        newBalances: 'Vec<u128>',
      },
      YieldCollected: {
        poolId: 'u32',
        a: 'u128',
        oldTotalSupply: 'u128',
        newTotalSupply: 'u128',
        who: 'AccountId32',
        amount: 'u128',
      },
      FeeCollected: {
        poolId: 'u32',
        a: 'u128',
        oldBalances: 'Vec<u128>',
        newBalances: 'Vec<u128>',
        oldTotalSupply: 'u128',
        newTotalSupply: 'u128',
        who: 'AccountId32',
        amount: 'u128',
      },
      AModified: {
        poolId: 'u32',
        value: 'u128',
        time: 'u32',
      },
      FeeModified: {
        poolId: 'u32',
        mintFee: 'u128',
        swapFee: 'u128',
        redeemFee: 'u128',
      },
      RecipientModified: {
        poolId: 'u32',
        feeRecipient: 'AccountId32',
        yieldRecipient: 'AccountId32'
      }
    }
  },
  /**
   * Lookup192: orml_payments::pallet::Event<T>
   **/
  OrmlPaymentsEvent: {
    _enum: {
      PaymentCreated: {
        from: 'AccountId32',
        asset: 'AcalaPrimitivesCurrencyCurrencyId',
        amount: 'u128',
        remark: 'Option<Bytes>',
      },
      PaymentReleased: {
        from: 'AccountId32',
        to: 'AccountId32',
      },
      PaymentCancelled: {
        from: 'AccountId32',
        to: 'AccountId32',
      },
      PaymentResolved: {
        from: 'AccountId32',
        to: 'AccountId32',
        recipientShare: 'Percent',
      },
      PaymentCreatorRequestedRefund: {
        from: 'AccountId32',
        to: 'AccountId32',
        expiry: 'u32',
      },
      PaymentRefundDisputed: {
        from: 'AccountId32',
        to: 'AccountId32',
      },
      PaymentRequestCreated: {
        from: 'AccountId32',
        to: 'AccountId32',
      },
      PaymentRequestCompleted: {
        from: 'AccountId32',
        to: 'AccountId32'
      }
    }
  },
  /**
   * Lookup196: module_earning::module::Event<T>
   **/
  ModuleEarningModuleEvent: {
    _enum: {
      Bonded: {
        who: 'AccountId32',
        amount: 'u128',
      },
      Unbonded: {
        who: 'AccountId32',
        amount: 'u128',
      },
      InstantUnbonded: {
        who: 'AccountId32',
        amount: 'u128',
        fee: 'u128',
      },
      Rebonded: {
        who: 'AccountId32',
        amount: 'u128',
      },
      Withdrawn: {
        who: 'AccountId32',
        amount: 'u128'
      }
    }
  },
  /**
   * Lookup197: cumulus_pallet_parachain_system::pallet::Event<T>
   **/
  CumulusPalletParachainSystemEvent: {
    _enum: {
      ValidationFunctionStored: 'Null',
      ValidationFunctionApplied: {
        relayChainBlockNum: 'u32',
      },
      ValidationFunctionDiscarded: 'Null',
      UpgradeAuthorized: {
        codeHash: 'H256',
      },
      DownwardMessagesReceived: {
        count: 'u32',
      },
      DownwardMessagesProcessed: {
        weightUsed: 'u64',
        dmqHead: 'H256'
      }
    }
  },
  /**
   * Lookup198: pallet_sudo::pallet::Event<T>
   **/
  PalletSudoEvent: {
    _enum: {
      Sudid: {
        sudoResult: 'Result<Null, SpRuntimeDispatchError>',
      },
      KeyChanged: {
        oldSudoer: 'Option<AccountId32>',
      },
      SudoAsDone: {
        sudoResult: 'Result<Null, SpRuntimeDispatchError>'
      }
    }
  },
  /**
   * Lookup199: frame_system::Phase
   **/
  FrameSystemPhase: {
    _enum: {
      ApplyExtrinsic: 'u32',
      Finalization: 'Null',
      Initialization: 'Null'
    }
  },
  /**
   * Lookup201: frame_system::LastRuntimeUpgradeInfo
   **/
  FrameSystemLastRuntimeUpgradeInfo: {
    specVersion: 'Compact<u32>',
    specName: 'Text'
  },
  /**
   * Lookup202: frame_system::pallet::Call<T>
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
   * Lookup207: frame_system::limits::BlockWeights
   **/
  FrameSystemLimitsBlockWeights: {
    baseBlock: 'u64',
    maxBlock: 'u64',
    perClass: 'FrameSupportWeightsPerDispatchClassWeightsPerClass'
  },
  /**
   * Lookup208: frame_support::weights::PerDispatchClass<frame_system::limits::WeightsPerClass>
   **/
  FrameSupportWeightsPerDispatchClassWeightsPerClass: {
    normal: 'FrameSystemLimitsWeightsPerClass',
    operational: 'FrameSystemLimitsWeightsPerClass',
    mandatory: 'FrameSystemLimitsWeightsPerClass'
  },
  /**
   * Lookup209: frame_system::limits::WeightsPerClass
   **/
  FrameSystemLimitsWeightsPerClass: {
    baseExtrinsic: 'u64',
    maxExtrinsic: 'Option<u64>',
    maxTotal: 'Option<u64>',
    reserved: 'Option<u64>'
  },
  /**
   * Lookup211: frame_system::limits::BlockLength
   **/
  FrameSystemLimitsBlockLength: {
    max: 'FrameSupportWeightsPerDispatchClassU32'
  },
  /**
   * Lookup212: frame_support::weights::PerDispatchClass<T>
   **/
  FrameSupportWeightsPerDispatchClassU32: {
    normal: 'u32',
    operational: 'u32',
    mandatory: 'u32'
  },
  /**
   * Lookup213: frame_support::weights::RuntimeDbWeight
   **/
  FrameSupportWeightsRuntimeDbWeight: {
    read: 'u64',
    write: 'u64'
  },
  /**
   * Lookup214: sp_version::RuntimeVersion
   **/
  SpVersionRuntimeVersion: {
    specName: 'Text',
    implName: 'Text',
    authoringVersion: 'u32',
    specVersion: 'u32',
    implVersion: 'u32',
    apis: 'Vec<([u8;8],u32)>',
    transactionVersion: 'u32',
    stateVersion: 'u8'
  },
  /**
   * Lookup218: frame_system::pallet::Error<T>
   **/
  FrameSystemError: {
    _enum: ['InvalidSpecName', 'SpecVersionNeedsToIncrease', 'FailedToExtractRuntimeVersion', 'NonDefaultComposite', 'NonZeroRefCount', 'CallFiltered']
  },
  /**
   * Lookup219: pallet_timestamp::pallet::Call<T>
   **/
  PalletTimestampCall: {
    _enum: {
      set: {
        now: 'Compact<u64>'
      }
    }
  },
  /**
   * Lookup222: pallet_scheduler::ScheduledV3<frame_support::traits::schedule::MaybeHashed<mandala_runtime::Call, primitive_types::H256>, BlockNumber, mandala_runtime::OriginCaller, sp_core::crypto::AccountId32>
   **/
  PalletSchedulerScheduledV3: {
    maybeId: 'Option<Bytes>',
    priority: 'u8',
    call: 'FrameSupportScheduleMaybeHashed',
    maybePeriodic: 'Option<(u32,u32)>',
    origin: 'MandalaRuntimeOriginCaller'
  },
  /**
   * Lookup223: frame_support::traits::schedule::MaybeHashed<mandala_runtime::Call, primitive_types::H256>
   **/
  FrameSupportScheduleMaybeHashed: {
    _enum: {
      Value: 'Call',
      Hash: 'H256'
    }
  },
  /**
   * Lookup225: pallet_scheduler::pallet::Call<T>
   **/
  PalletSchedulerCall: {
    _enum: {
      schedule: {
        when: 'u32',
        maybePeriodic: 'Option<(u32,u32)>',
        priority: 'u8',
        call: 'FrameSupportScheduleMaybeHashed',
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
        call: 'FrameSupportScheduleMaybeHashed',
      },
      cancel_named: {
        id: 'Bytes',
      },
      schedule_after: {
        after: 'u32',
        maybePeriodic: 'Option<(u32,u32)>',
        priority: 'u8',
        call: 'FrameSupportScheduleMaybeHashed',
      },
      schedule_named_after: {
        id: 'Bytes',
        after: 'u32',
        maybePeriodic: 'Option<(u32,u32)>',
        priority: 'u8',
        call: 'FrameSupportScheduleMaybeHashed'
      }
    }
  },
  /**
   * Lookup227: module_transaction_pause::module::Call<T>
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
   * Lookup228: pallet_preimage::pallet::Call<T>
   **/
  PalletPreimageCall: {
    _enum: {
      note_preimage: {
        bytes: 'Bytes',
      },
      unnote_preimage: {
        _alias: {
          hash_: 'hash',
        },
        hash_: 'H256',
      },
      request_preimage: {
        _alias: {
          hash_: 'hash',
        },
        hash_: 'H256',
      },
      unrequest_preimage: {
        _alias: {
          hash_: 'hash',
        },
        hash_: 'H256'
      }
    }
  },
  /**
   * Lookup229: pallet_balances::pallet::Call<T, I>
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
   * Lookup231: module_currencies::module::Call<T>
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
        accounts: 'Vec<AccountId32>',
      },
      force_set_lock: {
        who: 'MultiAddress',
        currencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        amount: 'Compact<u128>',
        lockId: '[u8;8]',
      },
      force_remove_lock: {
        who: 'MultiAddress',
        currencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        lockId: '[u8;8]'
      }
    }
  },
  /**
   * Lookup232: orml_vesting::module::Call<T>
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
   * Lookup234: module_transaction_payment::module::Call<T>
   **/
  ModuleTransactionPaymentModuleCall: {
    _enum: {
      set_alternative_fee_swap_path: {
        feeSwapPath: 'Option<Vec<AcalaPrimitivesCurrencyCurrencyId>>',
      },
      enable_charge_fee_pool: {
        currencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        poolSize: 'u128',
        swapThreshold: 'u128',
      },
      disable_charge_fee_pool: {
        currencyId: 'AcalaPrimitivesCurrencyCurrencyId',
      },
      with_fee_path: {
        feeSwapPath: 'Vec<AcalaPrimitivesCurrencyCurrencyId>',
        call: 'Call',
      },
      with_fee_currency: {
        currencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        call: 'Call',
      },
      with_fee_paid_by: {
        call: 'Call',
        payerAddr: 'AccountId32',
        payerSig: 'SpRuntimeMultiSignature',
      },
      with_fee_aggregated_path: {
        feeAggregatedPath: 'Vec<ModuleSupportDexAggregatedSwapPath>',
        call: 'Call'
      }
    }
  },
  /**
   * Lookup236: sp_runtime::MultiSignature
   **/
  SpRuntimeMultiSignature: {
    _enum: {
      Ed25519: 'SpCoreEd25519Signature',
      Sr25519: 'SpCoreSr25519Signature',
      Ecdsa: 'SpCoreEcdsaSignature'
    }
  },
  /**
   * Lookup237: sp_core::ed25519::Signature
   **/
  SpCoreEd25519Signature: '[u8;64]',
  /**
   * Lookup239: sp_core::sr25519::Signature
   **/
  SpCoreSr25519Signature: '[u8;64]',
  /**
   * Lookup240: sp_core::ecdsa::Signature
   **/
  SpCoreEcdsaSignature: '[u8;65]',
  /**
   * Lookup243: module_support::dex::AggregatedSwapPath<acala_primitives::currency::CurrencyId>
   **/
  ModuleSupportDexAggregatedSwapPath: {
    _enum: {
      Dex: 'Vec<AcalaPrimitivesCurrencyCurrencyId>',
      Taiga: '(u32,u32,u32)'
    }
  },
  /**
   * Lookup244: pallet_treasury::pallet::Call<T, I>
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
        proposalId: 'Compact<u32>',
      },
      spend: {
        amount: 'Compact<u128>',
        beneficiary: 'MultiAddress',
      },
      remove_approval: {
        proposalId: 'Compact<u32>'
      }
    }
  },
  /**
   * Lookup245: pallet_bounties::pallet::Call<T, I>
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
   * Lookup246: pallet_tips::pallet::Call<T, I>
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
   * Lookup247: pallet_utility::pallet::Call<T>
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
        asOrigin: 'MandalaRuntimeOriginCaller',
        call: 'Call',
      },
      force_batch: {
        calls: 'Vec<Call>'
      }
    }
  },
  /**
   * Lookup249: pallet_multisig::pallet::Call<T>
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
        call: 'WrapperKeepOpaque<Call>',
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
   * Lookup252: pallet_recovery::pallet::Call<T>
   **/
  PalletRecoveryCall: {
    _enum: {
      as_recovered: {
        account: 'AccountId32',
        call: 'Call',
      },
      set_recovered: {
        lost: 'AccountId32',
        rescuer: 'AccountId32',
      },
      create_recovery: {
        friends: 'Vec<AccountId32>',
        threshold: 'u16',
        delayPeriod: 'u32',
      },
      initiate_recovery: {
        account: 'AccountId32',
      },
      vouch_recovery: {
        lost: 'AccountId32',
        rescuer: 'AccountId32',
      },
      claim_recovery: {
        account: 'AccountId32',
      },
      close_recovery: {
        rescuer: 'AccountId32',
      },
      remove_recovery: 'Null',
      cancel_recovered: {
        account: 'AccountId32'
      }
    }
  },
  /**
   * Lookup253: pallet_proxy::pallet::Call<T>
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
   * Lookup255: module_idle_scheduler::module::Call<T>
   **/
  ModuleIdleSchedulerModuleCall: {
    _enum: {
      schedule_task: {
        task: 'MandalaRuntimeScheduledTasks'
      }
    }
  },
  /**
   * Lookup256: pallet_indices::pallet::Call<T>
   **/
  PalletIndicesCall: {
    _enum: {
      claim: {
        index: 'u32',
      },
      transfer: {
        _alias: {
          new_: 'new',
        },
        new_: 'AccountId32',
        index: 'u32',
      },
      free: {
        index: 'u32',
      },
      force_transfer: {
        _alias: {
          new_: 'new',
        },
        new_: 'AccountId32',
        index: 'u32',
        freeze: 'bool',
      },
      freeze: {
        index: 'u32'
      }
    }
  },
  /**
   * Lookup257: pallet_collective::pallet::Call<T, I>
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
   * Lookup258: pallet_membership::pallet::Call<T, I>
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
   * Lookup265: orml_authority::module::Call<T>
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
        initialOrigin: 'MandalaRuntimeOriginCaller',
        taskId: 'u32',
        when: 'FrameSupportScheduleDispatchTime',
      },
      delay_scheduled_dispatch: {
        initialOrigin: 'MandalaRuntimeOriginCaller',
        taskId: 'u32',
        additionalDelay: 'u32',
      },
      cancel_scheduled_dispatch: {
        initialOrigin: 'MandalaRuntimeOriginCaller',
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
   * Lookup266: acala_primitives::AuthoritysOriginId
   **/
  AcalaPrimitivesAuthoritysOriginId: {
    _enum: ['Root', 'Treasury', 'HonzonTreasury', 'HomaTreasury', 'TreasuryReserve']
  },
  /**
   * Lookup267: frame_support::traits::schedule::DispatchTime<BlockNumber>
   **/
  FrameSupportScheduleDispatchTime: {
    _enum: {
      At: 'u32',
      After: 'u32'
    }
  },
  /**
   * Lookup268: pallet_elections_phragmen::pallet::Call<T>
   **/
  PalletElectionsPhragmenCall: {
    _enum: {
      vote: {
        votes: 'Vec<AccountId32>',
        value: 'Compact<u128>',
      },
      remove_voter: 'Null',
      submit_candidacy: {
        candidateCount: 'Compact<u32>',
      },
      renounce_candidacy: {
        renouncing: 'PalletElectionsPhragmenRenouncing',
      },
      remove_member: {
        who: 'MultiAddress',
        hasReplacement: 'bool',
      },
      clean_defunct_voters: {
        numVoters: 'u32',
        numDefunct: 'u32'
      }
    }
  },
  /**
   * Lookup269: pallet_elections_phragmen::Renouncing
   **/
  PalletElectionsPhragmenRenouncing: {
    _enum: {
      Member: 'Null',
      RunnerUp: 'Null',
      Candidate: 'Compact<u32>'
    }
  },
  /**
   * Lookup270: pallet_democracy::pallet::Call<T>
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
   * Lookup271: pallet_democracy::conviction::Conviction
   **/
  PalletDemocracyConviction: {
    _enum: ['None', 'Locked1x', 'Locked2x', 'Locked3x', 'Locked4x', 'Locked5x', 'Locked6x']
  },
  /**
   * Lookup273: orml_oracle::module::Call<T, I>
   **/
  OrmlOracleModuleCall: {
    _enum: {
      feed_values: {
        values: 'Vec<(AcalaPrimitivesCurrencyCurrencyId,u128)>'
      }
    }
  },
  /**
   * Lookup275: orml_auction::module::Call<T>
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
   * Lookup276: orml_rewards::module::Call<T>
   **/
  OrmlRewardsModuleCall: 'Null',
  /**
   * Lookup277: module_prices::module::Call<T>
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
   * Lookup278: module_dex::module::Call<T>
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
        currencyIdB: 'AcalaPrimitivesCurrencyCurrencyId',
      },
      refund_provision: {
        owner: 'AccountId32',
        currencyIdA: 'AcalaPrimitivesCurrencyCurrencyId',
        currencyIdB: 'AcalaPrimitivesCurrencyCurrencyId',
      },
      abort_provisioning: {
        currencyIdA: 'AcalaPrimitivesCurrencyCurrencyId',
        currencyIdB: 'AcalaPrimitivesCurrencyCurrencyId'
      }
    }
  },
  /**
   * Lookup279: module_dex_oracle::module::Call<T>
   **/
  ModuleDexOracleModuleCall: {
    _enum: {
      enable_average_price: {
        currencyIdA: 'AcalaPrimitivesCurrencyCurrencyId',
        currencyIdB: 'AcalaPrimitivesCurrencyCurrencyId',
        interval: 'u64',
      },
      disable_average_price: {
        currencyIdA: 'AcalaPrimitivesCurrencyCurrencyId',
        currencyIdB: 'AcalaPrimitivesCurrencyCurrencyId',
      },
      update_average_price_interval: {
        currencyIdA: 'AcalaPrimitivesCurrencyCurrencyId',
        currencyIdB: 'AcalaPrimitivesCurrencyCurrencyId',
        newInterval: 'u64'
      }
    }
  },
  /**
   * Lookup280: module_aggregated_dex::module::Call<T>
   **/
  ModuleAggregatedDexModuleCall: {
    _enum: {
      swap_with_exact_supply: {
        paths: 'Vec<ModuleSupportDexAggregatedSwapPath>',
        supplyAmount: 'Compact<u128>',
        minTargetAmount: 'Compact<u128>',
      },
      swap_with_exact_target: {
        paths: 'Vec<ModuleSupportDexAggregatedSwapPath>',
        targetAmount: 'Compact<u128>',
        maxSupplyAmount: 'Compact<u128>',
      },
      update_aggregated_swap_paths: {
        updates: 'Vec<((AcalaPrimitivesCurrencyCurrencyId,AcalaPrimitivesCurrencyCurrencyId),Option<Vec<ModuleSupportDexAggregatedSwapPath>>)>'
      }
    }
  },
  /**
   * Lookup285: module_auction_manager::module::Call<T>
   **/
  ModuleAuctionManagerModuleCall: {
    _enum: {
      cancel: {
        id: 'u32'
      }
    }
  },
  /**
   * Lookup286: module_loans::module::Call<T>
   **/
  ModuleLoansModuleCall: 'Null',
  /**
   * Lookup287: module_honzon::module::Call<T>
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
      unauthorize_all: 'Null',
      expand_position_collateral: {
        currencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        increaseDebitValue: 'u128',
        minIncreaseCollateral: 'u128',
      },
      shrink_position_debit: {
        currencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        decreaseCollateral: 'u128',
        minDecreaseDebitValue: 'u128',
      },
      adjust_loan_by_debit_value: {
        currencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        collateralAdjustment: 'i128',
        debitValueAdjustment: 'i128',
      },
      transfer_debit: {
        fromCurrency: 'AcalaPrimitivesCurrencyCurrencyId',
        toCurrency: 'AcalaPrimitivesCurrencyCurrencyId',
        debitTransfer: 'u128'
      }
    }
  },
  /**
   * Lookup288: module_cdp_treasury::module::Call<T>
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
      exchange_collateral_to_stable: {
        currencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        swapLimit: 'ModuleSupportDexSwapLimit',
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
   * Lookup289: module_support::dex::SwapLimit<Balance>
   **/
  ModuleSupportDexSwapLimit: {
    _enum: {
      ExactSupply: '(u128,u128)',
      ExactTarget: '(u128,u128)'
    }
  },
  /**
   * Lookup290: module_cdp_engine::module::Call<T>
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
      set_collateral_params: {
        currencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        interestRatePerSec: 'OrmlTraitsChangeOption',
        liquidationRatio: 'OrmlTraitsChangeOption',
        liquidationPenalty: 'OrmlTraitsChangeOption',
        requiredCollateralRatio: 'OrmlTraitsChangeOption',
        maximumTotalDebitValue: 'OrmlTraitsChangeU128',
      },
      register_liquidation_contract: {
        address: 'H160',
      },
      deregister_liquidation_contract: {
        address: 'H160'
      }
    }
  },
  /**
   * Lookup291: orml_traits::Change<Option<sp_arithmetic::fixed_point::FixedU128>>
   **/
  OrmlTraitsChangeOption: {
    _enum: {
      NoChange: 'Null',
      NewValue: 'Option<u128>'
    }
  },
  /**
   * Lookup292: orml_traits::Change<Value>
   **/
  OrmlTraitsChangeU128: {
    _enum: {
      NoChange: 'Null',
      NewValue: 'u128'
    }
  },
  /**
   * Lookup293: module_emergency_shutdown::module::Call<T>
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
   * Lookup294: module_nominees_election::module::Call<T, I>
   **/
  ModuleNomineesElectionModuleCall: {
    _enum: {
      bond: {
        amount: 'Compact<u128>',
      },
      unbond: {
        amount: 'Compact<u128>',
      },
      rebond: {
        amount: 'Compact<u128>',
      },
      withdraw_unbonded: 'Null',
      nominate: {
        targets: 'Vec<AccountId32>',
      },
      chill: 'Null'
    }
  },
  /**
   * Lookup295: module_homa::module::Call<T>
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
        eraIndex: 'u32',
      },
      force_bump_current_era: {
        bumpAmount: 'u32',
      },
      fast_match_redeems_completely: {
        redeemerList: 'Vec<AccountId32>'
      }
    }
  },
  /**
   * Lookup300: module_xcm_interface::module::Call<T>
   **/
  ModuleXcmInterfaceModuleCall: {
    _enum: {
      update_xcm_dest_weight_and_fee: {
        updates: 'Vec<(ModuleXcmInterfaceModuleXcmInterfaceOperation,Option<u64>,Option<u128>)>'
      }
    }
  },
  /**
   * Lookup303: module_incentives::module::Call<T>
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
        poolId: 'ModuleSupportIncentivesPoolId',
      },
      update_incentive_rewards: {
        updates: 'Vec<(ModuleSupportIncentivesPoolId,Vec<(AcalaPrimitivesCurrencyCurrencyId,u128)>)>',
      },
      update_claim_reward_deduction_rates: {
        updates: 'Vec<(ModuleSupportIncentivesPoolId,u128)>'
      }
    }
  },
  /**
   * Lookup308: module_nft::module::Call<T>
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
   * Lookup310: acala_primitives::nft::ClassProperty
   **/
  AcalaPrimitivesNftClassProperty: {
    _enum: ['__Unused0', 'Transferable', 'Burnable', '__Unused3', 'Mintable', '__Unused5', '__Unused6', '__Unused7', 'ClassPropertiesMutable']
  },
  /**
   * Lookup313: module_asset_registry::module::Call<T>
   **/
  ModuleAssetRegistryModuleCall: {
    _enum: {
      register_foreign_asset: {
        location: 'XcmVersionedMultiLocation',
        metadata: 'AcalaPrimitivesCurrencyAssetMetadata',
      },
      update_foreign_asset: {
        foreignAssetId: 'u16',
        location: 'XcmVersionedMultiLocation',
        metadata: 'AcalaPrimitivesCurrencyAssetMetadata',
      },
      register_stable_asset: {
        metadata: 'AcalaPrimitivesCurrencyAssetMetadata',
      },
      update_stable_asset: {
        stableAssetId: 'u32',
        metadata: 'AcalaPrimitivesCurrencyAssetMetadata',
      },
      register_erc20_asset: {
        contract: 'H160',
        minimalBalance: 'u128',
      },
      update_erc20_asset: {
        contract: 'H160',
        metadata: 'AcalaPrimitivesCurrencyAssetMetadata',
      },
      register_native_asset: {
        currencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        metadata: 'AcalaPrimitivesCurrencyAssetMetadata',
      },
      update_native_asset: {
        currencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        metadata: 'AcalaPrimitivesCurrencyAssetMetadata'
      }
    }
  },
  /**
   * Lookup314: ecosystem_renvm_bridge::module::Call<T>
   **/
  EcosystemRenvmBridgeModuleCall: {
    _enum: {
      mint: {
        who: 'AccountId32',
        pHash: '[u8;32]',
        amount: 'Compact<u128>',
        nHash: '[u8;32]',
        sig: 'SpCoreEcdsaSignature',
      },
      burn: {
        to: 'Bytes',
        amount: 'Compact<u128>',
      },
      rotate_key: {
        newKey: '[u8;20]',
        sig: 'SpCoreEcdsaSignature'
      }
    }
  },
  /**
   * Lookup315: ecosystem_starport::module::Call<T>
   **/
  EcosystemStarportModuleCall: {
    _enum: {
      lock: {
        currencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        lockedAmount: 'u128',
      },
      lock_to: {
        to: 'AccountId32',
        currencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        lockedAmount: 'u128',
      },
      invoke: {
        notice: 'EcosystemStarportModuleGatewayNotice',
        signatures: 'Vec<AccountId32>'
      }
    }
  },
  /**
   * Lookup316: ecosystem_starport::module::GatewayNotice<sp_core::crypto::AccountId32>
   **/
  EcosystemStarportModuleGatewayNotice: {
    id: 'u64',
    payload: 'EcosystemStarportModuleGatewayNoticePayload'
  },
  /**
   * Lookup317: ecosystem_starport::module::GatewayNoticePayload<sp_core::crypto::AccountId32>
   **/
  EcosystemStarportModuleGatewayNoticePayload: {
    _enum: {
      SetSupplyCap: '(AcalaPrimitivesCurrencyCurrencyId,u128)',
      ChangeAuthorities: 'Vec<AccountId32>',
      Unlock: {
        currencyId: 'AcalaPrimitivesCurrencyCurrencyId',
        amount: 'u128',
        who: 'AccountId32',
      },
      SetFutureYield: {
        nextCashYield: 'u128',
        nextCashYieldIndex: 'u128',
        nextCashYieldStart: 'u64'
      }
    }
  },
  /**
   * Lookup318: cumulus_pallet_xcmp_queue::pallet::Call<T>
   **/
  CumulusPalletXcmpQueueCall: {
    _enum: {
      service_overweight: {
        index: 'u64',
        weightLimit: 'u64',
      },
      suspend_xcm_execution: 'Null',
      resume_xcm_execution: 'Null',
      update_suspend_threshold: {
        _alias: {
          new_: 'new',
        },
        new_: 'u32',
      },
      update_drop_threshold: {
        _alias: {
          new_: 'new',
        },
        new_: 'u32',
      },
      update_resume_threshold: {
        _alias: {
          new_: 'new',
        },
        new_: 'u32',
      },
      update_threshold_weight: {
        _alias: {
          new_: 'new',
        },
        new_: 'u64',
      },
      update_weight_restrict_decay: {
        _alias: {
          new_: 'new',
        },
        new_: 'u64',
      },
      update_xcmp_max_individual_weight: {
        _alias: {
          new_: 'new',
        },
        new_: 'u64'
      }
    }
  },
  /**
   * Lookup319: pallet_xcm::pallet::Call<T>
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
   * Lookup320: xcm::VersionedXcm<Call>
   **/
  XcmVersionedXcm: {
    _enum: {
      V0: 'XcmV0Xcm',
      V1: 'XcmV1Xcm',
      V2: 'XcmV2Xcm'
    }
  },
  /**
   * Lookup321: xcm::v0::Xcm<Call>
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
   * Lookup323: xcm::v0::order::Order<Call>
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
   * Lookup325: xcm::v0::Response
   **/
  XcmV0Response: {
    _enum: {
      Assets: 'Vec<XcmV0MultiAsset>'
    }
  },
  /**
   * Lookup326: xcm::v1::Xcm<Call>
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
   * Lookup328: xcm::v1::order::Order<Call>
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
   * Lookup330: xcm::v1::Response
   **/
  XcmV1Response: {
    _enum: {
      Assets: 'XcmV1MultiassetMultiAssets',
      Version: 'u32'
    }
  },
  /**
   * Lookup344: cumulus_pallet_dmp_queue::pallet::Call<T>
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
   * Lookup345: orml_xtokens::module::Call<T>
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
        destWeight: 'u64',
      },
      transfer_multicurrencies: {
        currencies: 'Vec<(AcalaPrimitivesCurrencyCurrencyId,u128)>',
        feeItem: 'u32',
        dest: 'XcmVersionedMultiLocation',
        destWeight: 'u64',
      },
      transfer_multiassets: {
        assets: 'XcmVersionedMultiAssets',
        feeItem: 'u32',
        dest: 'XcmVersionedMultiLocation',
        destWeight: 'u64'
      }
    }
  },
  /**
   * Lookup346: xcm::VersionedMultiAsset
   **/
  XcmVersionedMultiAsset: {
    _enum: {
      V0: 'XcmV0MultiAsset',
      V1: 'XcmV1MultiAsset'
    }
  },
  /**
   * Lookup347: orml_xcm::module::Call<T>
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
   * Lookup348: module_evm::module::Call<T>
   **/
  ModuleEvmModuleCall: {
    _enum: {
      eth_call: {
        action: 'EthereumTransactionTransactionAction',
        input: 'Bytes',
        value: 'Compact<u128>',
        gasLimit: 'Compact<u64>',
        storageLimit: 'Compact<u32>',
        accessList: 'Vec<EthereumTransactionAccessListItem>',
        validUntil: 'Compact<u32>',
      },
      call: {
        target: 'H160',
        input: 'Bytes',
        value: 'Compact<u128>',
        gasLimit: 'Compact<u64>',
        storageLimit: 'Compact<u32>',
        accessList: 'Vec<EthereumTransactionAccessListItem>',
      },
      scheduled_call: {
        from: 'H160',
        target: 'H160',
        input: 'Bytes',
        value: 'Compact<u128>',
        gasLimit: 'Compact<u64>',
        storageLimit: 'Compact<u32>',
        accessList: 'Vec<EthereumTransactionAccessListItem>',
      },
      create: {
        input: 'Bytes',
        value: 'Compact<u128>',
        gasLimit: 'Compact<u64>',
        storageLimit: 'Compact<u32>',
        accessList: 'Vec<EthereumTransactionAccessListItem>',
      },
      create2: {
        input: 'Bytes',
        salt: 'H256',
        value: 'Compact<u128>',
        gasLimit: 'Compact<u64>',
        storageLimit: 'Compact<u32>',
        accessList: 'Vec<EthereumTransactionAccessListItem>',
      },
      create_nft_contract: {
        input: 'Bytes',
        value: 'Compact<u128>',
        gasLimit: 'Compact<u64>',
        storageLimit: 'Compact<u32>',
        accessList: 'Vec<EthereumTransactionAccessListItem>',
      },
      create_predeploy_contract: {
        target: 'H160',
        input: 'Bytes',
        value: 'Compact<u128>',
        gasLimit: 'Compact<u64>',
        storageLimit: 'Compact<u32>',
        accessList: 'Vec<EthereumTransactionAccessListItem>',
      },
      transfer_maintainer: {
        contract: 'H160',
        newMaintainer: 'H160',
      },
      publish_contract: {
        contract: 'H160',
      },
      publish_free: {
        contract: 'H160',
      },
      enable_contract_development: 'Null',
      disable_contract_development: 'Null',
      set_code: {
        contract: 'H160',
        code: 'Bytes',
      },
      selfdestruct: {
        contract: 'H160',
      },
      strict_call: {
        target: 'H160',
        input: 'Bytes',
        value: 'Compact<u128>',
        gasLimit: 'Compact<u64>',
        storageLimit: 'Compact<u32>',
        accessList: 'Vec<EthereumTransactionAccessListItem>'
      }
    }
  },
  /**
   * Lookup349: ethereum::transaction::TransactionAction
   **/
  EthereumTransactionTransactionAction: {
    _enum: {
      Call: 'H160',
      Create: 'Null'
    }
  },
  /**
   * Lookup351: ethereum::transaction::AccessListItem
   **/
  EthereumTransactionAccessListItem: {
    address: 'H160',
    storageKeys: 'Vec<H256>'
  },
  /**
   * Lookup352: module_evm_accounts::module::Call<T>
   **/
  ModuleEvmAccountsModuleCall: {
    _enum: {
      claim_account: {
        ethAddress: 'H160',
        ethSignature: '[u8;65]',
      },
      claim_default_account: 'Null'
    }
  },
  /**
   * Lookup353: pallet_authorship::pallet::Call<T>
   **/
  PalletAuthorshipCall: {
    _enum: {
      set_uncles: {
        newUncles: 'Vec<SpRuntimeHeader>'
      }
    }
  },
  /**
   * Lookup355: sp_runtime::generic::header::Header<Number, sp_runtime::traits::BlakeTwo256>
   **/
  SpRuntimeHeader: {
    parentHash: 'H256',
    number: 'Compact<u32>',
    stateRoot: 'H256',
    extrinsicsRoot: 'H256',
    digest: 'SpRuntimeDigest'
  },
  /**
   * Lookup356: sp_runtime::traits::BlakeTwo256
   **/
  SpRuntimeBlakeTwo256: 'Null',
  /**
   * Lookup357: module_collator_selection::pallet::Call<T>
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
   * Lookup358: pallet_session::pallet::Call<T>
   **/
  PalletSessionCall: {
    _enum: {
      set_keys: {
        _alias: {
          keys_: 'keys',
        },
        keys_: 'MandalaRuntimeSessionKeys',
        proof: 'Bytes',
      },
      purge_keys: 'Null'
    }
  },
  /**
   * Lookup359: mandala_runtime::SessionKeys
   **/
  MandalaRuntimeSessionKeys: {
    aura: 'SpConsensusAuraSr25519AppSr25519Public'
  },
  /**
   * Lookup360: sp_consensus_aura::sr25519::app_sr25519::Public
   **/
  SpConsensusAuraSr25519AppSr25519Public: 'SpCoreSr25519Public',
  /**
   * Lookup361: sp_core::sr25519::Public
   **/
  SpCoreSr25519Public: '[u8;32]',
  /**
   * Lookup362: module_session_manager::module::Call<T>
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
   * Lookup363: nutsfinance_stable_asset::pallet::Call<T>
   **/
  NutsfinanceStableAssetCall: {
    _enum: {
      create_pool: {
        poolAsset: 'AcalaPrimitivesCurrencyCurrencyId',
        assets: 'Vec<AcalaPrimitivesCurrencyCurrencyId>',
        precisions: 'Vec<u128>',
        mintFee: 'u128',
        swapFee: 'u128',
        redeemFee: 'u128',
        initialA: 'u128',
        feeRecipient: 'AccountId32',
        yieldRecipient: 'AccountId32',
        precision: 'u128',
      },
      mint: {
        poolId: 'u32',
        amounts: 'Vec<u128>',
        minMintAmount: 'u128',
      },
      swap: {
        poolId: 'u32',
        i: 'u32',
        j: 'u32',
        dx: 'u128',
        minDy: 'u128',
        assetLength: 'u32',
      },
      redeem_proportion: {
        poolId: 'u32',
        amount: 'u128',
        minRedeemAmounts: 'Vec<u128>',
      },
      redeem_single: {
        poolId: 'u32',
        amount: 'u128',
        i: 'u32',
        minRedeemAmount: 'u128',
        assetLength: 'u32',
      },
      redeem_multi: {
        poolId: 'u32',
        amounts: 'Vec<u128>',
        maxRedeemAmount: 'u128',
      },
      modify_a: {
        poolId: 'u32',
        a: 'u128',
        futureABlock: 'u32',
      },
      modify_fees: {
        poolId: 'u32',
        mintFee: 'Option<u128>',
        swapFee: 'Option<u128>',
        redeemFee: 'Option<u128>',
      },
      modify_recipients: {
        poolId: 'u32',
        feeRecipient: 'Option<AccountId32>',
        yieldRecipient: 'Option<AccountId32>'
      }
    }
  },
  /**
   * Lookup364: orml_payments::pallet::Call<T>
   **/
  OrmlPaymentsCall: {
    _enum: {
      pay: {
        recipient: 'AccountId32',
        asset: 'AcalaPrimitivesCurrencyCurrencyId',
        amount: 'Compact<u128>',
        remark: 'Option<Bytes>',
      },
      release: {
        to: 'AccountId32',
      },
      cancel: {
        creator: 'AccountId32',
      },
      resolve_payment: {
        from: 'AccountId32',
        recipient: 'AccountId32',
        recipientShare: 'Percent',
      },
      request_refund: {
        recipient: 'AccountId32',
      },
      dispute_refund: {
        creator: 'AccountId32',
      },
      request_payment: {
        from: 'AccountId32',
        asset: 'AcalaPrimitivesCurrencyCurrencyId',
        amount: 'Compact<u128>',
      },
      accept_and_pay: {
        to: 'AccountId32'
      }
    }
  },
  /**
   * Lookup365: module_earning::module::Call<T>
   **/
  ModuleEarningModuleCall: {
    _enum: {
      bond: {
        amount: 'Compact<u128>',
      },
      unbond: {
        amount: 'Compact<u128>',
      },
      unbond_instant: {
        amount: 'Compact<u128>',
      },
      rebond: {
        amount: 'Compact<u128>',
      },
      withdraw_unbonded: 'Null'
    }
  },
  /**
   * Lookup366: cumulus_pallet_parachain_system::pallet::Call<T>
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
   * Lookup367: cumulus_primitives_parachain_inherent::ParachainInherentData
   **/
  CumulusPrimitivesParachainInherentParachainInherentData: {
    validationData: 'PolkadotPrimitivesV2PersistedValidationData',
    relayChainState: 'SpTrieStorageProof',
    downwardMessages: 'Vec<PolkadotCorePrimitivesInboundDownwardMessage>',
    horizontalMessages: 'BTreeMap<u32, Vec<PolkadotCorePrimitivesInboundHrmpMessage>>'
  },
  /**
   * Lookup368: polkadot_primitives::v2::PersistedValidationData<primitive_types::H256, N>
   **/
  PolkadotPrimitivesV2PersistedValidationData: {
    parentHead: 'Bytes',
    relayParentNumber: 'u32',
    relayParentStorageRoot: 'H256',
    maxPovSize: 'u32'
  },
  /**
   * Lookup370: sp_trie::storage_proof::StorageProof
   **/
  SpTrieStorageProof: {
    trieNodes: 'BTreeSet<Bytes>'
  },
  /**
   * Lookup373: polkadot_core_primitives::InboundDownwardMessage<BlockNumber>
   **/
  PolkadotCorePrimitivesInboundDownwardMessage: {
    sentAt: 'u32',
    msg: 'Bytes'
  },
  /**
   * Lookup376: polkadot_core_primitives::InboundHrmpMessage<BlockNumber>
   **/
  PolkadotCorePrimitivesInboundHrmpMessage: {
    sentAt: 'u32',
    data: 'Bytes'
  },
  /**
   * Lookup379: pallet_sudo::pallet::Call<T>
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
   * Lookup380: pallet_scheduler::pallet::Error<T>
   **/
  PalletSchedulerError: {
    _enum: ['FailedToSchedule', 'NotFound', 'TargetBlockNumberInPast', 'RescheduleNoChange']
  },
  /**
   * Lookup381: module_transaction_pause::module::Error<T>
   **/
  ModuleTransactionPauseModuleError: {
    _enum: ['CannotPause', 'InvalidCharacter']
  },
  /**
   * Lookup382: pallet_preimage::RequestStatus<sp_core::crypto::AccountId32, Balance>
   **/
  PalletPreimageRequestStatus: {
    _enum: {
      Unrequested: 'Option<(AccountId32,u128)>',
      Requested: 'u32'
    }
  },
  /**
   * Lookup385: pallet_preimage::pallet::Error<T>
   **/
  PalletPreimageError: {
    _enum: ['TooLarge', 'AlreadyNoted', 'NotAuthorized', 'NotNoted', 'Requested', 'NotRequested']
  },
  /**
   * Lookup387: pallet_balances::BalanceLock<Balance>
   **/
  PalletBalancesBalanceLock: {
    id: '[u8;8]',
    amount: 'u128',
    reasons: 'PalletBalancesReasons'
  },
  /**
   * Lookup388: pallet_balances::Reasons
   **/
  PalletBalancesReasons: {
    _enum: ['Fee', 'Misc', 'All']
  },
  /**
   * Lookup391: pallet_balances::ReserveData<acala_primitives::ReserveIdentifier, Balance>
   **/
  PalletBalancesReserveData: {
    id: 'AcalaPrimitivesReserveIdentifier',
    amount: 'u128'
  },
  /**
   * Lookup392: acala_primitives::ReserveIdentifier
   **/
  AcalaPrimitivesReserveIdentifier: {
    _enum: ['CollatorSelection', 'EvmStorageDeposit', 'EvmDeveloperDeposit', 'Honzon', 'Nft', 'TransactionPayment', 'TransactionPaymentDeposit', 'Count']
  },
  /**
   * Lookup394: pallet_balances::Releases
   **/
  PalletBalancesReleases: {
    _enum: ['V1_0_0', 'V2_0_0']
  },
  /**
   * Lookup395: pallet_balances::pallet::Error<T, I>
   **/
  PalletBalancesError: {
    _enum: ['VestingBalance', 'LiquidityRestrictions', 'InsufficientBalance', 'ExistentialDeposit', 'KeepAlive', 'ExistingVestingSchedule', 'DeadAccount', 'TooManyReserves']
  },
  /**
   * Lookup398: orml_tokens::BalanceLock<Balance>
   **/
  OrmlTokensBalanceLock: {
    id: '[u8;8]',
    amount: 'u128'
  },
  /**
   * Lookup400: orml_tokens::AccountData<Balance>
   **/
  OrmlTokensAccountData: {
    free: 'u128',
    reserved: 'u128',
    frozen: 'u128'
  },
  /**
   * Lookup402: orml_tokens::ReserveData<acala_primitives::ReserveIdentifier, Balance>
   **/
  OrmlTokensReserveData: {
    id: 'AcalaPrimitivesReserveIdentifier',
    amount: 'u128'
  },
  /**
   * Lookup404: orml_tokens::module::Error<T>
   **/
  OrmlTokensModuleError: {
    _enum: ['BalanceTooLow', 'AmountIntoBalanceFailed', 'LiquidityRestrictions', 'MaxLocksExceeded', 'KeepAlive', 'ExistentialDeposit', 'DeadAccount', 'TooManyReserves']
  },
  /**
   * Lookup405: module_currencies::module::Error<T>
   **/
  ModuleCurrenciesModuleError: {
    _enum: ['AmountIntoBalanceFailed', 'BalanceTooLow', 'Erc20InvalidOperation', 'EvmAccountNotFound', 'RealOriginNotFound', 'DepositFailed']
  },
  /**
   * Lookup407: orml_vesting::module::Error<T>
   **/
  OrmlVestingModuleError: {
    _enum: ['ZeroVestingPeriod', 'ZeroVestingPeriodCount', 'InsufficientBalanceToLock', 'TooManyVestingSchedules', 'AmountLow', 'MaxVestingSchedulesExceeded']
  },
  /**
   * Lookup409: frame_support::PalletId
   **/
  FrameSupportPalletId: '[u8;8]',
  /**
   * Lookup410: module_transaction_payment::module::Error<T>
   **/
  ModuleTransactionPaymentModuleError: {
    _enum: ['InvalidSwapPath', 'InvalidBalance', 'InvalidRate', 'InvalidToken', 'DexNotAvailable', 'ChargeFeePoolAlreadyExisted']
  },
  /**
   * Lookup411: pallet_treasury::Proposal<sp_core::crypto::AccountId32, Balance>
   **/
  PalletTreasuryProposal: {
    proposer: 'AccountId32',
    value: 'u128',
    beneficiary: 'AccountId32',
    bond: 'u128'
  },
  /**
   * Lookup415: pallet_treasury::pallet::Error<T, I>
   **/
  PalletTreasuryError: {
    _enum: ['InsufficientProposersBalance', 'InvalidIndex', 'TooManyApprovals', 'InsufficientPermission', 'ProposalNotApproved']
  },
  /**
   * Lookup416: pallet_bounties::Bounty<sp_core::crypto::AccountId32, Balance, BlockNumber>
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
   * Lookup417: pallet_bounties::BountyStatus<sp_core::crypto::AccountId32, BlockNumber>
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
   * Lookup419: pallet_bounties::pallet::Error<T, I>
   **/
  PalletBountiesError: {
    _enum: ['InsufficientProposersBalance', 'InvalidIndex', 'ReasonTooBig', 'UnexpectedStatus', 'RequireCurator', 'InvalidValue', 'InvalidFee', 'PendingPayout', 'Premature', 'HasActiveChildBounty', 'TooManyQueued']
  },
  /**
   * Lookup420: pallet_tips::OpenTip<sp_core::crypto::AccountId32, Balance, BlockNumber, primitive_types::H256>
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
   * Lookup421: pallet_tips::pallet::Error<T, I>
   **/
  PalletTipsError: {
    _enum: ['ReasonTooBig', 'AlreadyKnown', 'UnknownTip', 'NotFinder', 'StillOpen', 'Premature']
  },
  /**
   * Lookup422: pallet_utility::pallet::Error<T>
   **/
  PalletUtilityError: {
    _enum: ['TooManyCalls']
  },
  /**
   * Lookup424: pallet_multisig::Multisig<BlockNumber, Balance, sp_core::crypto::AccountId32>
   **/
  PalletMultisigMultisig: {
    when: 'PalletMultisigTimepoint',
    deposit: 'u128',
    depositor: 'AccountId32',
    approvals: 'Vec<AccountId32>'
  },
  /**
   * Lookup426: pallet_multisig::pallet::Error<T>
   **/
  PalletMultisigError: {
    _enum: ['MinimumThreshold', 'AlreadyApproved', 'NoApprovalsNeeded', 'TooFewSignatories', 'TooManySignatories', 'SignatoriesOutOfOrder', 'SenderInSignatories', 'NotFound', 'NotOwner', 'NoTimepoint', 'WrongTimepoint', 'UnexpectedTimepoint', 'MaxWeightTooLow', 'AlreadyStored']
  },
  /**
   * Lookup427: pallet_recovery::RecoveryConfig<BlockNumber, Balance, sp_runtime::bounded::bounded_vec::BoundedVec<sp_core::crypto::AccountId32, S>>
   **/
  PalletRecoveryRecoveryConfig: {
    delayPeriod: 'u32',
    deposit: 'u128',
    friends: 'Vec<AccountId32>',
    threshold: 'u16'
  },
  /**
   * Lookup430: pallet_recovery::ActiveRecovery<BlockNumber, Balance, sp_runtime::bounded::bounded_vec::BoundedVec<sp_core::crypto::AccountId32, S>>
   **/
  PalletRecoveryActiveRecovery: {
    created: 'u32',
    deposit: 'u128',
    friends: 'Vec<AccountId32>'
  },
  /**
   * Lookup431: pallet_recovery::pallet::Error<T>
   **/
  PalletRecoveryError: {
    _enum: ['NotAllowed', 'ZeroThreshold', 'NotEnoughFriends', 'MaxFriends', 'NotSorted', 'NotRecoverable', 'AlreadyRecoverable', 'AlreadyStarted', 'NotStarted', 'NotFriend', 'DelayPeriod', 'AlreadyVouched', 'Threshold', 'StillActive', 'AlreadyProxy', 'BadState']
  },
  /**
   * Lookup434: pallet_proxy::ProxyDefinition<sp_core::crypto::AccountId32, runtime_common::ProxyType, BlockNumber>
   **/
  PalletProxyProxyDefinition: {
    delegate: 'AccountId32',
    proxyType: 'RuntimeCommonProxyType',
    delay: 'u32'
  },
  /**
   * Lookup438: pallet_proxy::Announcement<sp_core::crypto::AccountId32, primitive_types::H256, BlockNumber>
   **/
  PalletProxyAnnouncement: {
    real: 'AccountId32',
    callHash: 'H256',
    height: 'u32'
  },
  /**
   * Lookup440: pallet_proxy::pallet::Error<T>
   **/
  PalletProxyError: {
    _enum: ['TooMany', 'NotFound', 'NotProxy', 'Unproxyable', 'Duplicate', 'NoPermission', 'Unannounced', 'NoSelfProxy']
  },
  /**
   * Lookup442: pallet_indices::pallet::Error<T>
   **/
  PalletIndicesError: {
    _enum: ['NotAssigned', 'NotOwner', 'InUse', 'NotTransfer', 'Permanent']
  },
  /**
   * Lookup444: pallet_collective::Votes<sp_core::crypto::AccountId32, BlockNumber>
   **/
  PalletCollectiveVotes: {
    index: 'u32',
    threshold: 'u32',
    ayes: 'Vec<AccountId32>',
    nays: 'Vec<AccountId32>',
    end: 'u32'
  },
  /**
   * Lookup445: pallet_collective::pallet::Error<T, I>
   **/
  PalletCollectiveError: {
    _enum: ['NotMember', 'DuplicateProposal', 'ProposalMissing', 'WrongIndex', 'DuplicateVote', 'AlreadyInitialized', 'TooEarly', 'TooManyProposals', 'WrongProposalWeight', 'WrongProposalLength']
  },
  /**
   * Lookup447: pallet_membership::pallet::Error<T, I>
   **/
  PalletMembershipError: {
    _enum: ['AlreadyMember', 'NotMember', 'TooManyMembers']
  },
  /**
   * Lookup455: orml_authority::module::Error<T>
   **/
  OrmlAuthorityModuleError: {
    _enum: ['FailedToSchedule', 'FailedToCancel', 'FailedToFastTrack', 'FailedToDelay', 'CallNotAuthorized', 'TriggerCallNotPermitted', 'WrongCallWeightBound']
  },
  /**
   * Lookup457: pallet_elections_phragmen::SeatHolder<sp_core::crypto::AccountId32, Balance>
   **/
  PalletElectionsPhragmenSeatHolder: {
    who: 'AccountId32',
    stake: 'u128',
    deposit: 'u128'
  },
  /**
   * Lookup458: pallet_elections_phragmen::Voter<sp_core::crypto::AccountId32, Balance>
   **/
  PalletElectionsPhragmenVoter: {
    votes: 'Vec<AccountId32>',
    stake: 'u128',
    deposit: 'u128'
  },
  /**
   * Lookup459: pallet_elections_phragmen::pallet::Error<T>
   **/
  PalletElectionsPhragmenError: {
    _enum: ['UnableToVote', 'NoVotes', 'TooManyVotes', 'MaximumVotesExceeded', 'LowBalance', 'UnableToPayBond', 'MustBeVoter', 'ReportSelf', 'DuplicatedCandidate', 'MemberSubmit', 'RunnerUpSubmit', 'InsufficientCandidateFunds', 'NotMember', 'InvalidWitnessData', 'InvalidVoteCount', 'InvalidRenouncing', 'InvalidReplacement']
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
    _enum: ['ValueLow', 'ProposalMissing', 'AlreadyCanceled', 'DuplicateProposal', 'ProposalBlacklisted', 'NotSimpleMajority', 'InvalidHash', 'NoProposal', 'AlreadyVetoed', 'DuplicatePreimage', 'NotImminent', 'TooEarly', 'Imminent', 'PreimageMissing', 'ReferendumInvalid', 'PreimageInvalid', 'NoneWaiting', 'NotVoter', 'NoPermission', 'AlreadyDelegating', 'InsufficientFunds', 'NotDelegating', 'VotesExist', 'InstantNotAllowed', 'Nonsense', 'WrongUpperBound', 'MaxVotesReached', 'TooManyProposals', 'VotingPeriodLow']
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
   * Lookup482: orml_traits::auction::AuctionInfo<sp_core::crypto::AccountId32, Balance, BlockNumber>
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
    _enum: ['PoolDoesNotExist', 'ShareDoesNotExist', 'CanSplitOnlyLessThanShare']
  },
  /**
   * Lookup493: orml_nft::ClassInfo<TokenId, sp_core::crypto::AccountId32, module_nft::ClassData<Balance>, sp_runtime::bounded::bounded_vec::BoundedVec<T, S>>
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
   * Lookup496: orml_nft::TokenInfo<sp_core::crypto::AccountId32, module_nft::TokenData<Balance>, sp_runtime::bounded::bounded_vec::BoundedVec<T, S>>
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
   * Lookup499: orml_nft::module::Error<T>
   **/
  OrmlNftModuleError: {
    _enum: ['NoAvailableClassId', 'NoAvailableTokenId', 'TokenNotFound', 'ClassNotFound', 'NoPermission', 'CannotDestroyClass', 'MaxMetadataExceeded']
  },
  /**
   * Lookup500: module_prices::module::Error<T>
   **/
  ModulePricesModuleError: {
    _enum: ['AccessPriceFailed', 'NoLockedPrice']
  },
  /**
   * Lookup501: module_dex::TradingPairStatus<Balance, BlockNumber>
   **/
  ModuleDexTradingPairStatus: {
    _enum: {
      Disabled: 'Null',
      Provisioning: 'ModuleDexProvisioningParameters',
      Enabled: 'Null'
    }
  },
  /**
   * Lookup502: module_dex::ProvisioningParameters<Balance, BlockNumber>
   **/
  ModuleDexProvisioningParameters: {
    minContribution: '(u128,u128)',
    targetProvision: '(u128,u128)',
    accumulatedProvision: '(u128,u128)',
    notBefore: 'u32'
  },
  /**
   * Lookup505: module_dex::module::Error<T>
   **/
  ModuleDexModuleError: {
    _enum: ['AlreadyEnabled', 'MustBeEnabled', 'MustBeProvisioning', 'MustBeDisabled', 'NotAllowedList', 'InvalidContributionIncrement', 'InvalidLiquidityIncrement', 'InvalidCurrencyId', 'InvalidTradingPathLength', 'InsufficientTargetAmount', 'ExcessiveSupplyAmount', 'InsufficientLiquidity', 'ZeroSupplyAmount', 'ZeroTargetAmount', 'UnacceptableShareIncrement', 'UnacceptableLiquidityWithdrawn', 'InvariantCheckFailed', 'UnqualifiedProvision', 'StillProvisioning', 'AssetUnregistered', 'InvalidTradingPath', 'NotAllowedRefund', 'CannotSwap']
  },
  /**
   * Lookup510: module_dex_oracle::module::Error<T>
   **/
  ModuleDexOracleModuleError: {
    _enum: ['AveragePriceAlreadyEnabled', 'AveragePriceMustBeEnabled', 'InvalidPool', 'InvalidCurrencyId', 'IntervalIsZero']
  },
  /**
   * Lookup513: module_aggregated_dex::module::Error<T>
   **/
  ModuleAggregatedDexModuleError: {
    _enum: ['CannotSwap', 'InvalidPoolId', 'InvalidTokenIndex', 'InvalidSwapPath']
  },
  /**
   * Lookup514: module_auction_manager::CollateralAuctionItem<sp_core::crypto::AccountId32, BlockNumber>
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
   * Lookup515: module_auction_manager::module::Error<T>
   **/
  ModuleAuctionManagerModuleError: {
    _enum: ['AuctionNotExists', 'InReverseStage', 'InvalidFeedPrice', 'MustAfterShutdown', 'InvalidBidPrice', 'InvalidAmount']
  },
  /**
   * Lookup517: acala_primitives::Position
   **/
  AcalaPrimitivesPosition: {
    collateral: 'u128',
    debit: 'u128'
  },
  /**
   * Lookup518: module_loans::module::Error<T>
   **/
  ModuleLoansModuleError: {
    _enum: ['AmountConvertFailed']
  },
  /**
   * Lookup520: module_honzon::module::Error<T>
   **/
  ModuleHonzonModuleError: {
    _enum: ['NoPermission', 'AlreadyShutdown', 'AuthorizationNotExists', 'AlreadyAuthorized']
  },
  /**
   * Lookup521: module_cdp_treasury::module::Error<T>
   **/
  ModuleCdpTreasuryModuleError: {
    _enum: ['CollateralNotEnough', 'SurplusPoolNotEnough', 'DebitPoolNotEnough', 'CannotSwap', 'NotDexShare']
  },
  /**
   * Lookup522: module_cdp_engine::RiskManagementParams
   **/
  ModuleCdpEngineRiskManagementParams: {
    maximumTotalDebitValue: 'u128',
    interestRatePerSec: 'Option<u128>',
    liquidationRatio: 'Option<u128>',
    liquidationPenalty: 'Option<u128>',
    requiredCollateralRatio: 'Option<u128>'
  },
  /**
   * Lookup525: module_cdp_engine::module::Error<T>
   **/
  ModuleCdpEngineModuleError: {
    _enum: ['ExceedDebitValueHardCap', 'BelowRequiredCollateralRatio', 'BelowLiquidationRatio', 'MustBeUnsafe', 'MustBeSafe', 'InvalidCollateralType', 'RemainDebitValueTooSmall', 'CollateralAmountBelowMinimum', 'InvalidFeedPrice', 'NoDebitValue', 'AlreadyShutdown', 'MustAfterShutdown', 'CollateralNotEnough', 'NotEnoughDebitDecrement', 'ConvertDebitBalanceFailed', 'LiquidationFailed', 'TooManyLiquidationContracts', 'CollateralContractNotFound']
  },
  /**
   * Lookup526: module_emergency_shutdown::module::Error<T>
   **/
  ModuleEmergencyShutdownModuleError: {
    _enum: ['AlreadyShutdown', 'MustAfterShutdown', 'CanNotRefund', 'ExistPotentialSurplus', 'ExistUnhandledDebit']
  },
  /**
   * Lookup528: acala_primitives::bonding::ledger::BondingLedger<Moment, MaxUnlockingChunks, MinBond>
   **/
  AcalaPrimitivesBondingLedgerBondingLedger: {
    total: 'u128',
    active: 'u128',
    unlocking: 'Vec<AcalaPrimitivesBondingLedgerUnlockChunk>'
  },
  /**
   * Lookup530: acala_primitives::bonding::ledger::UnlockChunk<Moment>
   **/
  AcalaPrimitivesBondingLedgerUnlockChunk: {
    value: 'u128',
    unlockAt: 'u32'
  },
  /**
   * Lookup532: module_nominees_election::module::Error<T, I>
   **/
  ModuleNomineesElectionModuleError: {
    _enum: ['BelowMinBondThreshold', 'InvalidTargetsLength', 'MaxUnlockChunksExceeded', 'InvalidNominee', 'NominateesCountExceeded', 'NotBonded']
  },
  /**
   * Lookup533: module_homa::module::StakingLedger
   **/
  ModuleHomaModuleStakingLedger: {
    bonded: 'Compact<u128>',
    unlocking: 'Vec<ModuleHomaModuleUnlockChunk>'
  },
  /**
   * Lookup537: module_homa::module::Error<T>
   **/
  ModuleHomaModuleError: {
    _enum: ['BelowMintThreshold', 'BelowRedeemThreshold', 'ExceededStakingCurrencySoftCap', 'InsufficientUnclaimedRedemption', 'OutdatedEraIndex', 'FastMatchIsNotAllowed', 'CannotCompletelyFastMatch']
  },
  /**
   * Lookup539: module_xcm_interface::module::Error<T>
   **/
  ModuleXcmInterfaceModuleError: {
    _enum: ['XcmFailed']
  },
  /**
   * Lookup541: module_incentives::module::Error<T>
   **/
  ModuleIncentivesModuleError: {
    _enum: ['NotEnough', 'InvalidCurrencyId', 'InvalidPoolId', 'InvalidRate']
  },
  /**
   * Lookup542: module_nft::module::Error<T>
   **/
  ModuleNftModuleError: {
    _enum: ['ClassIdNotFound', 'TokenIdNotFound', 'NoPermission', 'InvalidQuantity', 'NonTransferable', 'NonBurnable', 'NonMintable', 'CannotDestroyClass', 'Immutable', 'AttributesTooLarge', 'IncorrectTokenId']
  },
  /**
   * Lookup543: module_asset_registry::module::Error<T>
   **/
  ModuleAssetRegistryModuleError: {
    _enum: ['BadLocation', 'MultiLocationExisted', 'AssetIdNotExists', 'AssetIdExisted']
  },
  /**
   * Lookup545: ecosystem_renvm_bridge::module::Error<T>
   **/
  EcosystemRenvmBridgeModuleError: {
    _enum: ['InvalidRenVmPublicKey', 'InvalidMintSignature', 'SignatureAlreadyUsed']
  },
  /**
   * Lookup547: ecosystem_starport::module::Error<T>
   **/
  EcosystemStarportModuleError: {
    _enum: ['InsufficientAssetSupplyCap', 'NoticeAlreadyInvoked', 'InvalidNoticeInvoker', 'InsufficientAssetToUnlock', 'InsufficientValidNoticeSignatures', 'ExceededMaxNumberOfAuthorities', 'AuthoritiesListCannotBeEmpty']
  },
  /**
   * Lookup550: ecosystem_compound_cash::module::Error<T>
   **/
  EcosystemCompoundCashModuleError: {
    _enum: ['YieldIsOlderThanCurrent']
  },
  /**
   * Lookup552: cumulus_pallet_xcmp_queue::InboundChannelDetails
   **/
  CumulusPalletXcmpQueueInboundChannelDetails: {
    sender: 'u32',
    state: 'CumulusPalletXcmpQueueInboundState',
    messageMetadata: 'Vec<(u32,PolkadotParachainPrimitivesXcmpMessageFormat)>'
  },
  /**
   * Lookup553: cumulus_pallet_xcmp_queue::InboundState
   **/
  CumulusPalletXcmpQueueInboundState: {
    _enum: ['Ok', 'Suspended']
  },
  /**
   * Lookup556: polkadot_parachain::primitives::XcmpMessageFormat
   **/
  PolkadotParachainPrimitivesXcmpMessageFormat: {
    _enum: ['ConcatenatedVersionedXcm', 'ConcatenatedEncodedBlob', 'Signals']
  },
  /**
   * Lookup559: cumulus_pallet_xcmp_queue::OutboundChannelDetails
   **/
  CumulusPalletXcmpQueueOutboundChannelDetails: {
    recipient: 'u32',
    state: 'CumulusPalletXcmpQueueOutboundState',
    signalsExist: 'bool',
    firstIndex: 'u16',
    lastIndex: 'u16'
  },
  /**
   * Lookup560: cumulus_pallet_xcmp_queue::OutboundState
   **/
  CumulusPalletXcmpQueueOutboundState: {
    _enum: ['Ok', 'Suspended']
  },
  /**
   * Lookup562: cumulus_pallet_xcmp_queue::QueueConfigData
   **/
  CumulusPalletXcmpQueueQueueConfigData: {
    suspendThreshold: 'u32',
    dropThreshold: 'u32',
    resumeThreshold: 'u32',
    thresholdWeight: 'u64',
    weightRestrictDecay: 'u64',
    xcmpMaxIndividualWeight: 'u64'
  },
  /**
   * Lookup564: cumulus_pallet_xcmp_queue::pallet::Error<T>
   **/
  CumulusPalletXcmpQueueError: {
    _enum: ['FailedToSend', 'BadXcmOrigin', 'BadXcm', 'BadOverweightIndex', 'WeightOverLimit']
  },
  /**
   * Lookup565: pallet_xcm::pallet::QueryStatus<BlockNumber>
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
   * Lookup568: xcm::VersionedResponse
   **/
  XcmVersionedResponse: {
    _enum: {
      V0: 'XcmV0Response',
      V1: 'XcmV1Response',
      V2: 'XcmV2Response'
    }
  },
  /**
   * Lookup574: pallet_xcm::pallet::VersionMigrationStage
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
   * Lookup575: pallet_xcm::pallet::Error<T>
   **/
  PalletXcmError: {
    _enum: ['Unreachable', 'SendFailure', 'Filtered', 'UnweighableMessage', 'DestinationNotInvertible', 'Empty', 'CannotReanchor', 'TooManyAssets', 'InvalidOrigin', 'BadVersion', 'BadLocation', 'NoSubscription', 'AlreadySubscribed']
  },
  /**
   * Lookup576: cumulus_pallet_xcm::pallet::Error<T>
   **/
  CumulusPalletXcmError: 'Null',
  /**
   * Lookup577: cumulus_pallet_dmp_queue::ConfigData
   **/
  CumulusPalletDmpQueueConfigData: {
    maxIndividual: 'u64'
  },
  /**
   * Lookup578: cumulus_pallet_dmp_queue::PageIndexData
   **/
  CumulusPalletDmpQueuePageIndexData: {
    beginUsed: 'u32',
    endUsed: 'u32',
    overweightCount: 'u64'
  },
  /**
   * Lookup581: cumulus_pallet_dmp_queue::pallet::Error<T>
   **/
  CumulusPalletDmpQueueError: {
    _enum: ['Unknown', 'OverLimit']
  },
  /**
   * Lookup582: orml_xtokens::module::Error<T>
   **/
  OrmlXtokensModuleError: {
    _enum: ['AssetHasNoReserve', 'NotCrossChainTransfer', 'InvalidDest', 'NotCrossChainTransferableCurrency', 'UnweighableMessage', 'XcmExecutionFailed', 'CannotReanchor', 'InvalidAncestry', 'InvalidAsset', 'DestinationNotInvertible', 'BadVersion', 'DistinctReserveForAssetAndFee', 'ZeroFee', 'ZeroAmount', 'TooManyAssetsBeingSent', 'AssetIndexNonExistent', 'FeeNotEnough', 'NotSupportedMultiLocation', 'MinXcmFeeNotDefined']
  },
  /**
   * Lookup585: orml_unknown_tokens::module::Error<T>
   **/
  OrmlUnknownTokensModuleError: {
    _enum: ['BalanceTooLow', 'BalanceOverflow', 'UnhandledAsset']
  },
  /**
   * Lookup586: orml_xcm::module::Error<T>
   **/
  OrmlXcmModuleError: {
    _enum: ['Unreachable', 'SendFailure', 'BadVersion']
  },
  /**
   * Lookup587: module_evm::module::AccountInfo<Index>
   **/
  ModuleEvmModuleAccountInfo: {
    nonce: 'u32',
    contractInfo: 'Option<ModuleEvmModuleContractInfo>'
  },
  /**
   * Lookup589: module_evm::module::ContractInfo
   **/
  ModuleEvmModuleContractInfo: {
    codeHash: 'H256',
    maintainer: 'H160',
    published: 'bool'
  },
  /**
   * Lookup592: module_evm::module::CodeInfo
   **/
  ModuleEvmModuleCodeInfo: {
    codeSize: 'u32',
    refCount: 'u32'
  },
  /**
   * Lookup593: module_evm::module::Error<T>
   **/
  ModuleEvmModuleError: {
    _enum: ['AddressNotMapped', 'ContractNotFound', 'NoPermission', 'ContractDevelopmentNotEnabled', 'ContractDevelopmentAlreadyEnabled', 'ContractAlreadyPublished', 'ContractExceedsMaxCodeSize', 'ContractAlreadyExisted', 'OutOfStorage', 'ChargeFeeFailed', 'CannotKillContract', 'ReserveStorageFailed', 'UnreserveStorageFailed', 'ChargeStorageFailed', 'InvalidDecimals', 'StrictCallFailed']
  },
  /**
   * Lookup594: module_evm_bridge::module::Error<T>
   **/
  ModuleEvmBridgeModuleError: {
    _enum: ['ExecutionFail', 'ExecutionRevert', 'ExecutionFatal', 'ExecutionError', 'InvalidReturnValue']
  },
  /**
   * Lookup595: module_evm_accounts::module::Error<T>
   **/
  ModuleEvmAccountsModuleError: {
    _enum: ['AccountIdHasMapped', 'EthAddressHasMapped', 'BadSignature', 'InvalidSignature', 'NonZeroRefCount']
  },
  /**
   * Lookup597: pallet_authorship::UncleEntryItem<BlockNumber, primitive_types::H256, sp_core::crypto::AccountId32>
   **/
  PalletAuthorshipUncleEntryItem: {
    _enum: {
      InclusionHeight: 'u32',
      Uncle: '(H256,Option<AccountId32>)'
    }
  },
  /**
   * Lookup599: pallet_authorship::pallet::Error<T>
   **/
  PalletAuthorshipError: {
    _enum: ['InvalidUncleParent', 'UnclesAlreadySet', 'TooManyUncles', 'GenesisUncle', 'TooHighUncle', 'UncleAlreadyIncluded', 'OldUncle']
  },
  /**
   * Lookup602: module_collator_selection::pallet::Error<T>
   **/
  ModuleCollatorSelectionError: {
    _enum: ['MaxCandidatesExceeded', 'BelowCandidatesMin', 'StillLocked', 'Unknown', 'Permission', 'AlreadyCandidate', 'NotCandidate', 'NotNonCandidate', 'NothingToWithdraw', 'RequireSessionKey', 'AlreadyInvulnerable', 'InvalidProof', 'MaxInvulnerablesExceeded']
  },
  /**
   * Lookup606: sp_core::crypto::KeyTypeId
   **/
  SpCoreCryptoKeyTypeId: '[u8;4]',
  /**
   * Lookup607: pallet_session::pallet::Error<T>
   **/
  PalletSessionError: {
    _enum: ['InvalidProof', 'NoAssociatedValidatorId', 'DuplicatedKey', 'NoKeys', 'NoAccount']
  },
  /**
   * Lookup611: module_session_manager::module::Error<T>
   **/
  ModuleSessionManagerModuleError: {
    _enum: ['InvalidSession', 'InvalidDuration', 'EstimateNextSessionFailed']
  },
  /**
   * Lookup612: nutsfinance_stable_asset::StableAssetPoolInfo<acala_primitives::currency::CurrencyId, AtLeast64BitUnsigned, Balance, sp_core::crypto::AccountId32, BlockNumber>
   **/
  NutsfinanceStableAssetStableAssetPoolInfo: {
    poolAsset: 'AcalaPrimitivesCurrencyCurrencyId',
    assets: 'Vec<AcalaPrimitivesCurrencyCurrencyId>',
    precisions: 'Vec<u128>',
    mintFee: 'u128',
    swapFee: 'u128',
    redeemFee: 'u128',
    totalSupply: 'u128',
    a: 'u128',
    aBlock: 'u32',
    futureA: 'u128',
    futureABlock: 'u32',
    balances: 'Vec<u128>',
    feeRecipient: 'AccountId32',
    accountId: 'AccountId32',
    yieldRecipient: 'AccountId32',
    precision: 'u128'
  },
  /**
   * Lookup613: nutsfinance_stable_asset::pallet::Error<T>
   **/
  NutsfinanceStableAssetError: {
    _enum: ['InconsistentStorage', 'InvalidPoolAsset', 'ArgumentsMismatch', 'ArgumentsError', 'PoolNotFound', 'Math', 'InvalidPoolValue', 'MintUnderMin', 'SwapUnderMin', 'RedeemUnderMin', 'RedeemOverMax']
  },
  /**
   * Lookup614: orml_payments::types::PaymentDetail<T>
   **/
  OrmlPaymentsPaymentDetail: {
    asset: 'AcalaPrimitivesCurrencyCurrencyId',
    amount: 'Compact<u128>',
    incentiveAmount: 'Compact<u128>',
    state: 'OrmlPaymentsPaymentState',
    resolverAccount: 'AccountId32',
    feeDetail: 'Option<(AccountId32,u128)>'
  },
  /**
   * Lookup615: orml_payments::types::PaymentState<T>
   **/
  OrmlPaymentsPaymentState: {
    _enum: {
      Created: 'Null',
      NeedsReview: 'Null',
      RefundRequested: {
        cancelBlock: 'u32',
      },
      PaymentRequested: 'Null'
    }
  },
  /**
   * Lookup617: orml_payments::types::ScheduledTask<Time>
   **/
  OrmlPaymentsScheduledTask: {
    task: 'OrmlPaymentsTask',
    when: 'u32'
  },
  /**
   * Lookup618: orml_payments::types::Task
   **/
  OrmlPaymentsTask: {
    _enum: ['Cancel']
  },
  /**
   * Lookup622: orml_payments::pallet::Error<T>
   **/
  OrmlPaymentsError: {
    _enum: ['InvalidPayment', 'PaymentAlreadyReleased', 'PaymentAlreadyInProcess', 'InvalidAction', 'PaymentNeedsReview', 'MathError', 'RefundNotRequested', 'DisputePeriodNotPassed', 'RefundQueueFull']
  },
  /**
   * Lookup625: module_earning::module::Error<T>
   **/
  ModuleEarningModuleError: {
    _enum: ['BelowMinBondThreshold', 'MaxUnlockChunksExceeded', 'NotBonded']
  },
  /**
   * Lookup627: polkadot_primitives::v2::UpgradeRestriction
   **/
  PolkadotPrimitivesV2UpgradeRestriction: {
    _enum: ['Present']
  },
  /**
   * Lookup628: cumulus_pallet_parachain_system::relay_state_snapshot::MessagingStateSnapshot
   **/
  CumulusPalletParachainSystemRelayStateSnapshotMessagingStateSnapshot: {
    dmqMqcHead: 'H256',
    relayDispatchQueueSize: '(u32,u32)',
    ingressChannels: 'Vec<(u32,PolkadotPrimitivesV2AbridgedHrmpChannel)>',
    egressChannels: 'Vec<(u32,PolkadotPrimitivesV2AbridgedHrmpChannel)>'
  },
  /**
   * Lookup631: polkadot_primitives::v2::AbridgedHrmpChannel
   **/
  PolkadotPrimitivesV2AbridgedHrmpChannel: {
    maxCapacity: 'u32',
    maxTotalSize: 'u32',
    maxMessageSize: 'u32',
    msgCount: 'u32',
    totalSize: 'u32',
    mqcHead: 'Option<H256>'
  },
  /**
   * Lookup632: polkadot_primitives::v2::AbridgedHostConfiguration
   **/
  PolkadotPrimitivesV2AbridgedHostConfiguration: {
    maxCodeSize: 'u32',
    maxHeadDataSize: 'u32',
    maxUpwardQueueCount: 'u32',
    maxUpwardQueueSize: 'u32',
    maxUpwardMessageSize: 'u32',
    maxUpwardMessageNumPerCandidate: 'u32',
    hrmpMaxMessageNumPerCandidate: 'u32',
    validationUpgradeCooldown: 'u32',
    validationUpgradeDelay: 'u32'
  },
  /**
   * Lookup638: polkadot_core_primitives::OutboundHrmpMessage<polkadot_parachain::primitives::Id>
   **/
  PolkadotCorePrimitivesOutboundHrmpMessage: {
    recipient: 'u32',
    data: 'Bytes'
  },
  /**
   * Lookup639: cumulus_pallet_parachain_system::pallet::Error<T>
   **/
  CumulusPalletParachainSystemError: {
    _enum: ['OverlappingUpgrades', 'ProhibitedByPolkadot', 'TooBig', 'ValidationDataNotAvailable', 'HostConfigurationNotAvailable', 'NotScheduled', 'NothingAuthorized', 'Unauthorized']
  },
  /**
   * Lookup640: pallet_sudo::pallet::Error<T>
   **/
  PalletSudoError: {
    _enum: ['RequireSudo']
  },
  /**
   * Lookup643: frame_system::extensions::check_non_zero_sender::CheckNonZeroSender<T>
   **/
  FrameSystemExtensionsCheckNonZeroSender: 'Null',
  /**
   * Lookup644: frame_system::extensions::check_spec_version::CheckSpecVersion<T>
   **/
  FrameSystemExtensionsCheckSpecVersion: 'Null',
  /**
   * Lookup645: frame_system::extensions::check_tx_version::CheckTxVersion<T>
   **/
  FrameSystemExtensionsCheckTxVersion: 'Null',
  /**
   * Lookup646: frame_system::extensions::check_genesis::CheckGenesis<T>
   **/
  FrameSystemExtensionsCheckGenesis: 'Null',
  /**
   * Lookup649: runtime_common::check_nonce::CheckNonce<T>
   **/
  RuntimeCommonCheckNonce: {
    nonce: 'Compact<u32>'
  },
  /**
   * Lookup650: frame_system::extensions::check_weight::CheckWeight<T>
   **/
  FrameSystemExtensionsCheckWeight: 'Null',
  /**
   * Lookup651: module_evm::SetEvmOrigin<T>
   **/
  ModuleEvmSetEvmOrigin: 'Null',
  /**
   * Lookup652: module_transaction_payment::ChargeTransactionPayment<T>
   **/
  ModuleTransactionPaymentChargeTransactionPayment: 'Compact<u128>',
  /**
   * Lookup653: mandala_runtime::StorageDepositPerByte
   **/
  MandalaRuntimeStorageDepositPerByte: 'Null',
  /**
   * Lookup654: mandala_runtime::TxFeePerGas
   **/
  MandalaRuntimeTxFeePerGas: 'Null',
  /**
   * Lookup656: acala_primitives::signature::AcalaMultiSignature
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
  }
};
