import { registerEnumType } from "@nestjs/graphql";

export enum FaqStatus {
    ACTIVE = 'ACTIVE',
    BLOCKED = 'BLOCKED',
    DELETED = 'DELETED',
  }

  registerEnumType(FaqStatus, {
    name: 'FaqStatus',
  });
  

export enum FaqCategory {
    GENERAL = 'GENERAL',
    FOR_BUYERS = 'FOR_BUYERS',
    FOR_STORES = 'FOR_STORES',
    MEMBERSHIP = 'MEMBERSHIP',
    COMMUNITY = 'COMMUNITY',
    PAYMENT = 'PAYMENT',
    OTHERS = 'OTHERS',
    PROPERTY = "PROPERTY", 
  }

    registerEnumType(FaqCategory, {
        name: 'FaqCategory',
    });