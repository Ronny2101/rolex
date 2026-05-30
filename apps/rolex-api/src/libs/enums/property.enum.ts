import { registerEnumType } from '@nestjs/graphql';

export enum PropertyType {
	CLASSIC = 'CLASSIC',
	SMART = 'SMART',
	LUXURY = 'LUXURY',
	SPORT = 'SPORT',
	DIVER = 'DIVER',
	FIELD = 'FIELD',
	RACING = 'RACING',
	PILOT = 'PILOT',
}

registerEnumType(PropertyType, {
	name: 'PropertyType',
});

export enum PropertyMovement {
	AUTOMATIC = 'AUTOMATIC',
	QUARTZ = 'QUARTZ',
	MANUAL = 'MANUAL',
}

registerEnumType(PropertyMovement, {
	name: 'PropertyMovement',
});

export enum PropertyStatus {
	AVAILABLE = 'AVAILABLE',
	SOLD = 'SOLD',
	DELETE = 'DELETE',
    ACTIVE = 'ACTIVE',
}

registerEnumType(PropertyStatus, {
	name: 'PropertyStatus',
  });


export enum PropertyLocation {
	SEOUL = 'SEOUL',
	BUSAN = 'BUSAN',
	INCHEON = 'INCHEON',
	DAEGU = 'DAEGU',
	GYEONGJU = 'GYEONGJU',
	GWANGJU = 'GWANGJU',
	JEONJU = 'JEONJU',
	DAEJEON = 'DAEJEON',
	JEJU = 'JEJU',
	PARIS = 'PARIS',
	TOKYO = 'TOKYO',
	NEWYORK = 'NEWYORK',
	MILAN = 'MILAN',
}

registerEnumType(PropertyLocation, {
	name: 'PropertyLocation',
  });

export enum PropertyMaterial {
	STEEL = 'STEEL',
	SILVER = 'SILVER',
	PLATINIUM = 'PLATINIUM',
	GOLD = 'GOLD',
	DIAMOND = 'DIAMOND',
	TITANIUM = 'TITANIUM',
	BRONZE = 'BRONZE',
	CERAMIC = 'CERAMIC',
	CARBON = 'CARBON',
}

registerEnumType(PropertyMaterial, {
	name: 'PropertyMaterial',
  });

export enum PropertyGender {
	MEN = 'MEN',
	WOMEN = 'WOMEN',
  }
  
  registerEnumType(PropertyGender, {
	name: 'PropertyGender',
  });