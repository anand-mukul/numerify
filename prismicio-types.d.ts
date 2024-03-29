// Code generated by Slice Machine. DO NOT EDIT.

import type * as prismic from "@prismicio/client";

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };

type UpdatesDocumentDataSlicesSlice = UpdateSlice;

/**
 * Content for updates documents
 */
interface UpdatesDocumentData {
  /**
   * Slice Zone field in *updates*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: updates.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<UpdatesDocumentDataSlicesSlice> /**
   * Meta Title field in *updates*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: updates.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */;
  meta_title: prismic.KeyTextField;

  /**
   * Meta Description field in *updates*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: updates.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_description: prismic.KeyTextField;

  /**
   * Meta Image field in *updates*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: updates.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  meta_image: prismic.ImageField<never>;
}

/**
 * updates document from Prismic
 *
 * - **API ID**: `updates`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type UpdatesDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithoutUID<
    Simplify<UpdatesDocumentData>,
    "updates",
    Lang
  >;

export type AllDocumentTypes = UpdatesDocument;

/**
 * Primary content in *Update → Primary*
 */
export interface UpdateSliceDefaultPrimary {
  /**
   * Release Date field in *Update → Primary*
   *
   * - **Field Type**: Date
   * - **Placeholder**: *None*
   * - **API ID Path**: update.primary.release_date
   * - **Documentation**: https://prismic.io/docs/field#date
   */
  release_date: prismic.DateField;
}

/**
 * Primary content in *Update → Items*
 */
export interface UpdateSliceDefaultItem {
  /**
   * Release Title field in *Update → Items*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: update.items[].release_title
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  release_title: prismic.RichTextField;

  /**
   * Release Message field in *Update → Items*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: update.items[].release_message
   * - **Documentation**: https://prismic.io/docs/field#rich-text-title
   */
  release_message: prismic.RichTextField;
}

/**
 * Releases variation for Update Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type UpdateSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<UpdateSliceDefaultPrimary>,
  Simplify<UpdateSliceDefaultItem>
>;

/**
 * Slice variation for *Update*
 */
type UpdateSliceVariation = UpdateSliceDefault;

/**
 * Update Shared Slice
 *
 * - **API ID**: `update`
 * - **Description**: Update
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type UpdateSlice = prismic.SharedSlice<"update", UpdateSliceVariation>;

declare module "@prismicio/client" {
  interface CreateClient {
    (
      repositoryNameOrEndpoint: string,
      options?: prismic.ClientConfig,
    ): prismic.Client<AllDocumentTypes>;
  }

  namespace Content {
    export type {
      UpdatesDocument,
      UpdatesDocumentData,
      UpdatesDocumentDataSlicesSlice,
      AllDocumentTypes,
      UpdateSlice,
      UpdateSliceDefaultPrimary,
      UpdateSliceDefaultItem,
      UpdateSliceVariation,
      UpdateSliceDefault,
    };
  }
}
