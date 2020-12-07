import { Construct } from 'constructs';
import { App, Chart } from 'cdk8s';
import { DeboredApp, IngressType } from './lib/DeboreExtended';
// import { HelmRelease, HelmReleaseSpecHelmVersion } from './imports/helm.fluxcd.io/helmrelease';

// import { ConfigMap, LimitRangeList, Pod, Service, ServiceAccount } from './imports/k8s';
// import { Pod } from './imports/k8s';
// import { Jenkins } from './imports/jenkins.io/jenkins';
// import { KubePod } from './imports/k8s';

export class MyChart extends Chart {
  constructor(scope: Construct, name: string) {
    
    super(scope, name);

    new DeboredApp(this, 'podinfo3', {
      image: '245775375184.dkr.ecr.ap-northeast-1.amazonaws.com/cdk8s-demo-podinfo:93f85566',
      containerPort: 9898,
      namespace: 'default',
      defaultReplicas: 4,
      ingress: IngressType.CLUSTER_IP,
      autoScale: true,
      annotations: { 
        'flux.weave.works/automated' : 'true',
        // 'flux.weave.works/ignore'    : 'true'
      }
    });

    // new HelmRelease(this, 'nginx', {
    //   metadata: {
    //     name: 'nginx',
    //     namespace: 'nginx'
    //   },
    //   spec: {
    //     chart: {
    //       repository: 'https://charts.bitnami.com/bitnami',
    //       name: 'nginx',
    //       version: '5.6.1'
    //     },
    //     helmVersion: HelmReleaseSpecHelmVersion.V3,
    //     releaseName: 'mynginx',
    //   }
    // });
    // new Jenkins(this, 'jenkins',{
    //   spec: {
    //     jenkinsAPISettings: {
    //       authorizationStrategy: 'user/pw'
    //     },

    //     master: {
    //       disableCSRFProtection: true,
    //       containers: [ 
    //         {
    //           image: 'TEST',
    //           name: 'JENKINS',
    //           imagePullPolicy: 'always',
    //           resources: {
    //             limits: {
    //               cpu: "500m",
    //               memory: "128m" 
    //             }
    //           }
    //         }
    //       ],


    //     }
    //   }
    // });

    // const label = { app: 'podinfo'};


    // define resources here
    // new KubeDeployment(this, 'deployment', {
    //   spec: {
    //     selector: {
    //       matchLabels: label
    //     },
    //     replicas: 3,
    //     template: {
    //       metadata: {
    //         labels: label
    //       },
    //     spec: {
    //       containers: [
    //         {
    //           name: 'hello',
    //           image: 'stefanprodan/podinfo', 
    //           ports: [
    //             { containerPort: 9898 }
    //           ],
    //           resources: {
    //             limits: {
    //               cpu: "200m",
    //               memory: "128Mi"
    //             }
    //           }
    //         }
    //       ]
    //     }
    //     }
    //   }
    // });
    // new KubePod(this, 'podinfo', {
    //   spec: {
    //     containers: [
    //       {
    //         name: 'hello',
    //         image: 'stefanprodan/podinfo', 
    //         ports: [
    //           { containerPort: 9898 }
    //         ],
    //         resources: {
    //           limits: {
    //             cpu: "500m",
    //             memory: "128Mi"
    //           }
    //         }
    //       }
    //     ]
    //   }
    // }); 


    


    
  } 
}

const app = new App();
new MyChart(app, 'hello-cdk8s');
app.synth();