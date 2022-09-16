# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### SharedStaticWebsiteHosting <a name="SharedStaticWebsiteHosting" id="@scaleleap/cdk-shared-static-website-hosting.SharedStaticWebsiteHosting"></a>

Host static websites on a shared CloudFront distribution.

#### Initializers <a name="Initializers" id="@scaleleap/cdk-shared-static-website-hosting.SharedStaticWebsiteHosting.Initializer"></a>

```typescript
import { SharedStaticWebsiteHosting } from '@scaleleap/cdk-shared-static-website-hosting'

new SharedStaticWebsiteHosting(scope: Construct, id: string, props: SharedStaticWebsiteHostingProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@scaleleap/cdk-shared-static-website-hosting.SharedStaticWebsiteHosting.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@scaleleap/cdk-shared-static-website-hosting.SharedStaticWebsiteHosting.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@scaleleap/cdk-shared-static-website-hosting.SharedStaticWebsiteHosting.Initializer.parameter.props">props</a></code> | <code><a href="#@scaleleap/cdk-shared-static-website-hosting.SharedStaticWebsiteHostingProps">SharedStaticWebsiteHostingProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@scaleleap/cdk-shared-static-website-hosting.SharedStaticWebsiteHosting.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@scaleleap/cdk-shared-static-website-hosting.SharedStaticWebsiteHosting.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@scaleleap/cdk-shared-static-website-hosting.SharedStaticWebsiteHosting.Initializer.parameter.props"></a>

- *Type:* <a href="#@scaleleap/cdk-shared-static-website-hosting.SharedStaticWebsiteHostingProps">SharedStaticWebsiteHostingProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@scaleleap/cdk-shared-static-website-hosting.SharedStaticWebsiteHosting.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@scaleleap/cdk-shared-static-website-hosting.SharedStaticWebsiteHosting.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@scaleleap/cdk-shared-static-website-hosting.SharedStaticWebsiteHosting.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="@scaleleap/cdk-shared-static-website-hosting.SharedStaticWebsiteHosting.isConstruct"></a>

```typescript
import { SharedStaticWebsiteHosting } from '@scaleleap/cdk-shared-static-website-hosting'

SharedStaticWebsiteHosting.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="@scaleleap/cdk-shared-static-website-hosting.SharedStaticWebsiteHosting.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@scaleleap/cdk-shared-static-website-hosting.SharedStaticWebsiteHosting.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@scaleleap/cdk-shared-static-website-hosting.SharedStaticWebsiteHosting.property.bucket">bucket</a></code> | <code>aws-cdk-lib.aws_s3.IBucket</code> | Bucket where the static files are stored. |
| <code><a href="#@scaleleap/cdk-shared-static-website-hosting.SharedStaticWebsiteHosting.property.distribution">distribution</a></code> | <code>aws-cdk-lib.aws_cloudfront.IDistribution</code> | CloudFront distribution. |

---

##### `node`<sup>Required</sup> <a name="node" id="@scaleleap/cdk-shared-static-website-hosting.SharedStaticWebsiteHosting.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `bucket`<sup>Required</sup> <a name="bucket" id="@scaleleap/cdk-shared-static-website-hosting.SharedStaticWebsiteHosting.property.bucket"></a>

```typescript
public readonly bucket: IBucket;
```

- *Type:* aws-cdk-lib.aws_s3.IBucket

Bucket where the static files are stored.

---

##### `distribution`<sup>Required</sup> <a name="distribution" id="@scaleleap/cdk-shared-static-website-hosting.SharedStaticWebsiteHosting.property.distribution"></a>

```typescript
public readonly distribution: IDistribution;
```

- *Type:* aws-cdk-lib.aws_cloudfront.IDistribution

CloudFront distribution.

---


## Structs <a name="Structs" id="Structs"></a>

### SharedStaticWebsiteHostingProps <a name="SharedStaticWebsiteHostingProps" id="@scaleleap/cdk-shared-static-website-hosting.SharedStaticWebsiteHostingProps"></a>

#### Initializer <a name="Initializer" id="@scaleleap/cdk-shared-static-website-hosting.SharedStaticWebsiteHostingProps.Initializer"></a>

```typescript
import { SharedStaticWebsiteHostingProps } from '@scaleleap/cdk-shared-static-website-hosting'

const sharedStaticWebsiteHostingProps: SharedStaticWebsiteHostingProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@scaleleap/cdk-shared-static-website-hosting.SharedStaticWebsiteHostingProps.property.hostedZone">hostedZone</a></code> | <code>aws-cdk-lib.aws_route53.IHostedZone</code> | A hosted zone that is open for modification by the construct. |
| <code><a href="#@scaleleap/cdk-shared-static-website-hosting.SharedStaticWebsiteHostingProps.property.bucket">bucket</a></code> | <code>aws-cdk-lib.aws_s3.IBucket</code> | An S3 bucket where the static files will be stored. |

---

##### `hostedZone`<sup>Required</sup> <a name="hostedZone" id="@scaleleap/cdk-shared-static-website-hosting.SharedStaticWebsiteHostingProps.property.hostedZone"></a>

```typescript
public readonly hostedZone: IHostedZone;
```

- *Type:* aws-cdk-lib.aws_route53.IHostedZone

A hosted zone that is open for modification by the construct.

This construct will add a wildcard
A record that points to the CloudFront distribution.

---

##### `bucket`<sup>Optional</sup> <a name="bucket" id="@scaleleap/cdk-shared-static-website-hosting.SharedStaticWebsiteHostingProps.property.bucket"></a>

```typescript
public readonly bucket: IBucket;
```

- *Type:* aws-cdk-lib.aws_s3.IBucket
- *Default:* A new bucket will be created, if not provided.

An S3 bucket where the static files will be stored.

This construct assumes full control of the bucket.

---



