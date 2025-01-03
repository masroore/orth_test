/**
 * SPDX-FileCopyrightText: 2023-2024 Sebastien Jodogne, UCLouvain, Belgium,
 * and 2018-2024 Open Health Imaging Foundation
 * SPDX-License-Identifier: MIT
 */

window.config = {
  extensions: [],
  modes: [],
  customizationService: {
    // Shows a custom route -access via http://localhost:3000/custom
    // helloPage: '@ohif/extension-default.customizationModule.helloPage',
  },

  showStudyList: false,
  investigationalUseDialog: {
    option: 'never',
  },

  whiteLabeling: {
    /* Used to replace the default Logo */
    createLogoComponentFn: function (React) {
      return React.createElement("a", {
        target: "_self",
        rel: "noopener noreferrer",
        className: "header-brand",
        href: "/",
        style: {
          display: "block",
          background: "url(/logo.png)",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          width: "200px",
        },
      });
    },
  },

  customizationService: {
    cornerstoneOverlayTopLeft: {
      id: 'cornerstoneOverlayTopLeft',
      items: [
        {
          id: 'WindowLevel',
          customizationType: 'ohif.overlayItem.windowLevel',
        },
        {
          id: 'PatientName',
          customizationType: 'ohif.overlayItem',
          label: 'Pt:',
          color: 'white',
          condition: ({ instance }) =>
            instance &&
            instance.PatientName &&
            instance.PatientName.Alphabetic,
          contentF: ({ instance, formatters: { formatPN } }) => {
            if (instance && instance.PatientName && instance.PatientName.Alphabetic) {
              return formatPN(instance.PatientName.Alphabetic) + ' ' + (instance.PatientSex ? '(' + instance.PatientSex + ')' : '');
            } else {
              return 'N/A';
            }
          },
        },
        {
          id: 'PatientAge',
          customizationType: 'ohif.overlayItem',
          label: 'Age:',
          color: 'white',
          title: "Patient's Age",
          condition: ({ instance }) => instance && instance.PatientAge,
          contentF: ({ instance }) => instance.PatientAge,
        },
        {
          id: 'ID',
          customizationType: 'ohif.overlayItem',
          label: 'ID:',
          color: 'white',
          title: 'Patient PID',
          condition: ({ instance }) => instance && instance.PatientID,
          contentF: ({ instance }) => instance.PatientID,
        },
      ],
    },
  },

  // some windows systems have issues with more than 3 web workers
  maxNumberOfWebWorkers: 3,
  // below flag is for performance reasons, but it might not work for all servers
  omitQuotationForMultipartRequest: true,
  showWarningMessageForCrossOrigin: true,
  showCPUFallbackMessage: true,
  showLoadingIndicator: true,
  strictZSpacingForVolumeViewport: true,
  maxNumRequests: {
    interaction: 100,
    thumbnail: 75,
    // Prefetch number is dependent on the http protocol. For http 2 or
    // above, the number of requests can be go a lot higher.
    prefetch: 25,
  },
  // filterQueryParam: false,
  httpErrorHandler: error => {
    // This is 429 when rejected from the public idc sandbox too often.
    if (error.status) {
      console.warn(error.status);
    } else {
      console.warn(error);
    }
  },
  hotkeys: [
    {
      commandName: 'incrementActiveViewport',
      label: 'Next Viewport',
      keys: ['right'],
    },
    {
      commandName: 'decrementActiveViewport',
      label: 'Previous Viewport',
      keys: ['left'],
    },
    { commandName: 'rotateViewportCW', label: 'Rotate Right', keys: ['r'] },
    { commandName: 'rotateViewportCCW', label: 'Rotate Left', keys: ['l'] },
    { commandName: 'invertViewport', label: 'Invert', keys: ['i'] },
    {
      commandName: 'flipViewportHorizontal',
      label: 'Flip Horizontally',
      keys: ['h'],
    },
    {
      commandName: 'flipViewportVertical',
      label: 'Flip Vertically',
      keys: ['v'],
    },
    { commandName: 'scaleUpViewport', label: 'Zoom In', keys: ['+'] },
    { commandName: 'scaleDownViewport', label: 'Zoom Out', keys: ['-'] },
    { commandName: 'fitViewportToWindow', label: 'Zoom to Fit', keys: ['='] },
    { commandName: 'resetViewport', label: 'Reset', keys: ['space'] },
    { commandName: 'nextImage', label: 'Next Image', keys: ['down'] },
    { commandName: 'previousImage', label: 'Previous Image', keys: ['up'] },
    // {
    //   commandName: 'previousViewportDisplaySet',
    //   label: 'Previous Series',
    //   keys: ['pagedown'],
    // },
    // {
    //   commandName: 'nextViewportDisplaySet',
    //   label: 'Next Series',
    //   keys: ['pageup'],
    // },
    {
      commandName: 'setToolActive',
      commandOptions: { toolName: 'Zoom' },
      label: 'Zoom',
      keys: ['z'],
    },
    // ~ Window level presets
    {
      commandName: 'windowLevelPreset1',
      label: 'W/L Preset 1',
      keys: ['1'],
    },
    {
      commandName: 'windowLevelPreset2',
      label: 'W/L Preset 2',
      keys: ['2'],
    },
    {
      commandName: 'windowLevelPreset3',
      label: 'W/L Preset 3',
      keys: ['3'],
    },
    {
      commandName: 'windowLevelPreset4',
      label: 'W/L Preset 4',
      keys: ['4'],
    },
    {
      commandName: 'windowLevelPreset5',
      label: 'W/L Preset 5',
      keys: ['5'],
    },
    {
      commandName: 'windowLevelPreset6',
      label: 'W/L Preset 6',
      keys: ['6'],
    },
    {
      commandName: 'windowLevelPreset7',
      label: 'W/L Preset 7',
      keys: ['7'],
    },
    {
      commandName: 'windowLevelPreset8',
      label: 'W/L Preset 8',
      keys: ['8'],
    },
    {
      commandName: 'windowLevelPreset9',
      label: 'W/L Preset 9',
      keys: ['9'],
    },
  ],
};

/**
 * SPDX-FileCopyrightText: 2023-2024 Sebastien Jodogne, UCLouvain, Belgium,
 * and 2018-2024 Open Health Imaging Foundation
 * SPDX-License-Identifier: MIT
 */

window.config.routerBasename = '/ohif/';

if (true) {
  window.config.dataSources = [
    {
      friendlyName: 'Orthanc DICOMweb',
      namespace: '@ohif/extension-default.dataSourcesModule.dicomweb',
      sourceName: 'dicomweb',
      configuration: {
        name: 'orthanc',

        wadoUriRoot: '../dicom-web',
        qidoRoot: '../dicom-web',
        wadoRoot: '../dicom-web',

        qidoSupportsIncludeField: false,
        supportsReject: false,
        imageRendering: 'wadors',
        thumbnailRendering: 'wadors',
        enableStudyLazyLoad: true,
        supportsFuzzyMatching: false,
        supportsWildcard: true,
        staticWado: true,
        singlepart: 'bulkdata,pdf,video',
        acceptHeader: ['multipart/related; type=application/octet-stream; transfer-syntax=*']
      }
    }
  ];

  window.config.defaultDataSourceName = 'dicomweb';

} else {
  window.config.showStudyList = false;
  window.config.dataSources = [
    {
      friendlyName: 'Orthanc DICOM JSON',
      namespace: '@ohif/extension-default.dataSourcesModule.dicomjson',
      sourceName: 'dicomjson',
      configuration: {
        name: 'json',
      },
    }
  ];

  window.config.defaultDataSourceName = 'dicomjson';
}
