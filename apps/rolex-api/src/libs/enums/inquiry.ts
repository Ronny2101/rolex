import { registerEnumType } from "@nestjs/graphql";

export enum InquiryType {
    GENERAL = 'GENERAL',
    DELIVERY = 'DELIVERY',
    PROPERTY = 'PROPERTY',
    ACCOUNT = 'ACCOUNT',
  }
  registerEnumType(InquiryType, { name: 'InquiryType' });