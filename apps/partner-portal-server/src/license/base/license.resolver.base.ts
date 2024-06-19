/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import * as graphql from "@nestjs/graphql";
import { GraphQLError } from "graphql";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import { License } from "./License";
import { LicenseCountArgs } from "./LicenseCountArgs";
import { LicenseFindManyArgs } from "./LicenseFindManyArgs";
import { LicenseFindUniqueArgs } from "./LicenseFindUniqueArgs";
import { CreateLicenseArgs } from "./CreateLicenseArgs";
import { UpdateLicenseArgs } from "./UpdateLicenseArgs";
import { DeleteLicenseArgs } from "./DeleteLicenseArgs";
import { Company } from "../../company/base/Company";
import { ModuleModel } from "../../moduleModel/base/ModuleModel";
import { LicenseService } from "../license.service";
@graphql.Resolver(() => License)
export class LicenseResolverBase {
  constructor(protected readonly service: LicenseService) {}

  async _licensesMeta(
    @graphql.Args() args: LicenseCountArgs
  ): Promise<MetaQueryPayload> {
    const result = await this.service.count(args);
    return {
      count: result,
    };
  }

  @graphql.Query(() => [License])
  async licenses(
    @graphql.Args() args: LicenseFindManyArgs
  ): Promise<License[]> {
    return this.service.licenses(args);
  }

  @graphql.Query(() => License, { nullable: true })
  async license(
    @graphql.Args() args: LicenseFindUniqueArgs
  ): Promise<License | null> {
    const result = await this.service.license(args);
    if (result === null) {
      return null;
    }
    return result;
  }

  @graphql.Mutation(() => License)
  async createLicense(
    @graphql.Args() args: CreateLicenseArgs
  ): Promise<License> {
    return await this.service.createLicense({
      ...args,
      data: {
        ...args.data,

        company: args.data.company
          ? {
              connect: args.data.company,
            }
          : undefined,

        moduleField: args.data.moduleField
          ? {
              connect: args.data.moduleField,
            }
          : undefined,
      },
    });
  }

  @graphql.Mutation(() => License)
  async updateLicense(
    @graphql.Args() args: UpdateLicenseArgs
  ): Promise<License | null> {
    try {
      return await this.service.updateLicense({
        ...args,
        data: {
          ...args.data,

          company: args.data.company
            ? {
                connect: args.data.company,
              }
            : undefined,

          moduleField: args.data.moduleField
            ? {
                connect: args.data.moduleField,
              }
            : undefined,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new GraphQLError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => License)
  async deleteLicense(
    @graphql.Args() args: DeleteLicenseArgs
  ): Promise<License | null> {
    try {
      return await this.service.deleteLicense(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new GraphQLError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.ResolveField(() => Company, {
    nullable: true,
    name: "company",
  })
  async getCompany(@graphql.Parent() parent: License): Promise<Company | null> {
    const result = await this.service.getCompany(parent.id);

    if (!result) {
      return null;
    }
    return result;
  }

  @graphql.ResolveField(() => ModuleModel, {
    nullable: true,
    name: "moduleField",
  })
  async getModuleField(
    @graphql.Parent() parent: License
  ): Promise<ModuleModel | null> {
    const result = await this.service.getModuleField(parent.id);

    if (!result) {
      return null;
    }
    return result;
  }
}